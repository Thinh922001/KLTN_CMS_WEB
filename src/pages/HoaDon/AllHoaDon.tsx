import { get_all_order_new } from '@/api/order';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetch from '@/hooks/useFetch';
import { IKhachHang } from '@/Types/KhachHang';
import { IOrder, OrderStatus } from '@/Types/order';
import { IPaging } from '@/Types/Pagging';
import { ChevronLeft, ChevronRight, Ellipsis, Loader } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ItemOrderDetail from './ItemOrderDetail';
import ModelUpdateStatus from './ModelUpdateStatus';
const ListHoaDonNew = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [listKhachHang, setListKhachHang] = React.useState<IOrder[]>([]);
  const [take, setTake] = React.useState<number>(5);
  const [skip, setSkip] = React.useState<number>(0);
  const [paging, setPaging] = React.useState<IPaging>();

  const handleOpenModal = (userId: number) => {
    setOpenModalId((prevId) => (prevId === userId ? null : userId));
  };
  const handleOpenModalUpdate = (userId: number) => {
    setOpenModalIdUpdate((prevId) => (prevId === userId ? null : userId));
  };

  const [openModalId, setOpenModalId] = React.useState<number | null>(null);
  const [openModalIdUpdate, setOpenModalIdUpdate] = React.useState<
    number | null
  >(null);

  const [status, setStatus] = React.useState<OrderStatus>(OrderStatus.ALL);

  const handleChangeStatus = (status: OrderStatus) => {
    setStatus(status);
  };

  React.useEffect(() => {
    handleStateApi(async () => {
      const res = await get_all_order_new(take, skip, status);
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
      <Breadcrumb pageName="Danh sách hóa đơn" />
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Lấy số lượng hóa đơn</span>
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
            handleChangeStatus(e.target.value as OrderStatus);
          }}
          className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
        >
          <option value={OrderStatus.ALL}>Tất cả</option>
          <option value={OrderStatus.Pending}>Chờ xử lý</option>
          <option value={OrderStatus.Processing}>Đang xử lý</option>
          <option value={OrderStatus.Canceled}>Đơn hàng bị hủy</option>
          <option value={OrderStatus.Returned}>Trả hàng</option>
          <option value={OrderStatus.Completed}>Thành công</option>
        </select>
      </div>
      <div className="flex flex-col gap-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"># ID</TableHead>
              <TableHead>Tình trạng</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Nơi giao</TableHead>
              <TableHead>Số điện thoại</TableHead>
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
              listKhachHang?.map((item: IOrder) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.total_amount}</TableCell>
                  <TableCell>{item.shipping_address}</TableCell>
                  <TableCell>{item.customer.phone}</TableCell>
                  <TableCell className="text-right relative">
                    <div className="flex gap-2 items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-black">
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuLabel>
                            Đơn hàng - #{item.id}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleOpenModal(item.id || 0)}
                          >
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleOpenModalUpdate(item.id || 0)}
                          >
                            Cập nhập trạng thái
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {openModalId === item.id && (
                        <ItemOrderDetail
                          orderId={item.id || 0}
                          onClose={() => setOpenModalId(null)}
                        />
                      )}
                      {openModalIdUpdate === item.id && (
                        <ModelUpdateStatus
                          orderId={item.id || 0}
                          onClose={() => setOpenModalIdUpdate(null)}
                          orderStatus={String(item.status)}
                        />
                      )}
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
export default ListHoaDonNew;
