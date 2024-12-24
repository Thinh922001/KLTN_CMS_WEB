import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetch from '@/hooks/useFetch';
import { OrderReturnStatus } from '@/Types/order';
import { IPaging } from '@/Types/Pagging';
import { ChevronLeft, ChevronRight, Ellipsis, Loader } from 'lucide-react';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

import {
  change_status_return_order,
  get_all_return_order,
} from '@/api/rerurn-order';
import ImageGallery from '@/components/LightBox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReturnOrder } from '@/Types/return-order';
import { toastMessage } from '@/utils/toastHelper';

const ListDoiTra = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [listKhachHang, setListKhachHang] = React.useState<ReturnOrder[]>([]);
  const [take, setTake] = React.useState<number>(5);
  const [skip, setSkip] = React.useState<number>(0);
  const [paging, setPaging] = React.useState<IPaging>();

  const [status, setStatus] = React.useState<OrderReturnStatus>(
    OrderReturnStatus.Pending,
  );

  const handleChangeStatus = (status: OrderReturnStatus) => {
    setStatus(status);
  };

  const handleStatusChange = (id: number, status: OrderReturnStatus) => {
    hanldeCallChangeStatus(id, status);
  };

  const hanldeCallChangeStatus = (id: number, status: OrderReturnStatus) => {
    handleStateApiAnorther(async () => {
      if (!id) return;
      const res = await change_status_return_order(id, status);
      if (res.statusCode === 200) {
        toastMessage('Cập nhật đổi trả thành công', 'success');
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  React.useEffect(() => {
    handleStateApi(async () => {
      const res = await get_all_return_order(take, skip, status);
      if (res.statusCode == 200) {
        setListKhachHang(res.data.data);
        setPaging(res.data.paging);
        return;
      } else {
        setListKhachHang([]);
      }
    });
  }, [take, skip, stateApiAnorther.loading, status]);
  return (
    <>
      <Breadcrumb pageName="Danh sách đổi trả" />
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Lấy số lượng danh sách đổi trả</span>
          <select
            name=""
            id=""
            onChange={(e) => {
              setTake(Number(e.target.value));
              setSkip(0);
            }}
            className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
            <option value={45}>45</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="py-2 flex flex-col gap-2">
        <label htmlFor="" className="font-bold">
          Trạng thái
        </label>
        <select
          name=""
          id=""
          value={status}
          onChange={(e) => {
            handleChangeStatus(e.target.value as OrderReturnStatus);
          }}
          className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
        >
          <option value={OrderReturnStatus.Pending}>Chờ xử lý</option>
          <option value={OrderReturnStatus.Resolved}>Đã xử lý</option>
          <option value={OrderReturnStatus.Rejected}>Từ chối</option>
        </select>
      </div>
      <div className="flex flex-col gap-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"># ID</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Giá trị hoàn trả</TableHead>
              <TableHead>Lý do</TableHead>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tình trạng</TableHead>
              <TableHead>Đã hoàn tiền</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stateApi.loading ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center py-5 flex items-center justify-center"
                >
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : listKhachHang.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-5 flex items-center justify-center"
                >
                  Không có gì ở đây
                </TableCell>
              </TableRow>
            ) : (
              listKhachHang?.map((item: ReturnOrder) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.returnPrice.toLocaleString()}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    {item.img.length > 0 ? (
                      <ImageGallery images={item.img} />
                    ) : null}
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    {item.isApprove ? 'Đã hoàn trả' : 'Chưa hoàn trả'}
                  </TableCell>
                  <TableCell className="text-right relative">
                    <div className="flex gap-2 items-center">
                      {item.status === OrderReturnStatus.Pending ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-black">
                            <Ellipsis />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="left">
                            <DropdownMenuLabel>Cập nhật</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(
                                  item.id,
                                  OrderReturnStatus.Resolved,
                                )
                              }
                            >
                              Giải quyết
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(
                                  item.id,
                                  OrderReturnStatus.Rejected,
                                )
                              }
                            >
                              Từ chối
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end py-3 items-center gap-5">
          <span
            className={`w-10 h-10 border border-black rounded-full flex items-center justify-center cursor-pointer ${
              !paging?.isPrev ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => setSkip(skip - take)}
          >
            <ChevronLeft />
          </span>
          <span
            className={`w-10 h-10 border border-black rounded-full flex items-center justify-center cursor-pointer ${
              !paging?.isNext ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => setSkip(skip + take)}
          >
            <ChevronRight />
          </span>
        </div>
      </div>
    </>
  );
};
export default ListDoiTra;
