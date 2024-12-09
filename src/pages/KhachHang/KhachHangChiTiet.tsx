import { get_all_order_by_user } from '@/api/order';
import { get_user_by_id, update_user } from '@/api/user';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import useFetch from '@/hooks/useFetch';
import { IKhachHang } from '@/Types/KhachHang';
import { EOrderStatus, IOrderUser } from '@/Types/order';
import { toastMessage } from '@/utils/toastHelper';
import { ChevronLeft, Ellipsis, Loader } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemOrderDetail from '../HoaDon/ItemOrderDetail';
import ModelUpdateStatus from '../HoaDon/ModelUpdateStatus';
const KhachHangChiTiet = (): JSX.Element => {
  const { id } = useParams();
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [khachHang, setKhachHang] = React.useState<IKhachHang>();
  const [orderList, setOrderList] = React.useState<IOrderUser[]>([]);
  const [status, setStatus] = React.useState<EOrderStatus>(EOrderStatus.ALL);
  const [openModalId, setOpenModalId] = React.useState<number | null>(null);
  const [openModalIdUpdate, setOpenModalIdUpdate] = React.useState<
    number | null
  >(null);
  const handleOpenModal = (userId: number) => {
    setOpenModalId((prevId) => (prevId === userId ? null : userId));
  };
  const handleOpenModalUpdate = (userId: number) => {
    setOpenModalIdUpdate((prevId) => (prevId === userId ? null : userId));
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const res = await get_user_by_id(Number(id));
        if (res.data !== null) {
          setKhachHang(res.data);
        } else {
          toastMessage('Không tìm thấy khách hàng', 'error');
          navigate('/user');
        }
      });
    };
    fetch();
  }, []);
  React.useEffect(() => {
    const fetch = () => {
      handleStateApiAnorther(async () => {
        const resorder = await get_all_order_by_user(Number(id));
        if (resorder.statusCode === 200) {
          if (status === EOrderStatus.ALL) {
            setOrderList(resorder.data);
          } else {
            setOrderList(
              resorder.data.filter(
                (order: IOrderUser) => order.status === status,
              ),
            );
          }
        } else {
          toastMessage('Không tìm thấy khách hàng', 'error');
          navigate('/user');
        }
      });
    };
    fetch();
  }, [status, openModalIdUpdate]);

  const handleUpdateCustomer = () => {
    handleStateApi(async () => {
      const res = await update_user(khachHang || {});
      if (res.statusCode === 200) {
        toastMessage('Cập nhật thông tin khách hàng thành công', 'success');
      } else {
        toastMessage('Có lỗi xảy ra', 'error');
      }
    });
  };

  return (
    <div>
      <div className="flex gap-2 justify-between">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => navigate('/user')}
        >
          <ChevronLeft />
          <span> Trở về</span>
        </div>
        <Button onClick={handleUpdateCustomer}>
          {stateApiAnorther.loading ? (
            <Loader className="animate-spin text-white" />
          ) : (
            'Cập nhập thông tin khách hàng'
          )}
        </Button>
      </div>
      <div className="w-full">
        {stateApi.loading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="p-5">
              <h2 className="text-center font-bold py-2">
                Thông tin khách hàng
              </h2>
              <div className="flex flex-col gap-9">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">Tên Khách hàng</span>
                  <Input
                    type="text"
                    value={khachHang?.name}
                    onChange={(e) =>
                      setKhachHang({ ...khachHang, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">Giới tính</span>
                  <select
                    value={khachHang?.gender}
                    onChange={(e) =>
                      setKhachHang({ ...khachHang, gender: e.target.value })
                    }
                    name="gender"
                    id=""
                    className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">Địa chỉ</span>
                  <Input
                    type="text"
                    value={khachHang?.address}
                    onChange={(e) =>
                      setKhachHang({ ...khachHang, address: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-center"></div>
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
                  setStatus(e.target.value as EOrderStatus);
                }}
                className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
              >
                <option value={EOrderStatus.ALL}>All</option>
                <option value={EOrderStatus.PENDING}>Pending</option>
                <option value={EOrderStatus.DELIVERED}>Delivered</option>
                <option value={EOrderStatus.SHIPPED}>Shipped</option>
                <option value={EOrderStatus.CONFIRMED}>Confirmed</option>
                <option value={EOrderStatus.CANCELLED}>Cancelled</option>
                <option value={EOrderStatus.RETURNED}>Returned</option>
                <option value={EOrderStatus.REFUNDED}>Refunded</option>
              </select>
            </div>
            <Table className="w-full h-full ">
              <TableRow>
                <TableHead className="w-[100px]"># ID hóa đơn</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Địa chỉ giao</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
              <TableBody>
                {stateApiAnorther.loading ? (
                  <TableRow className="border-b-2 border-t-0 border-l-2 border-r-2 border-black">
                    <TableCell colSpan={5} className="text-center ">
                      <div className="w-full flex items-center justify-center">
                        <Loader className="animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : orderList.length > 0 ? (
                  orderList.map((item: IOrderUser) => (
                    <TableRow key={item.id} className=" ">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.total_amount}</TableCell>
                      <TableCell>{item.shipping_address}</TableCell>
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
                                onClick={() =>
                                  handleOpenModalUpdate(item.id || 0)
                                }
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
                              orderStatus={item.status || 'Pending'}
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-b-2 border-t-0 border-l-2 border-r-2 border-black">
                    <TableCell colSpan={5} className="text-center ">
                      Không có hóa đơn nào của khách hàng này
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};
export default KhachHangChiTiet;
