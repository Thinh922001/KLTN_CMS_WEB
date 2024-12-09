import { get_all_order_by_user } from '@/api/order';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { ChevronsDown, Ellipsis, Loader } from 'lucide-react';
import React from 'react';
import ItemOrderDetail from './ItemOrderDetail';
import ModelUpdateStatus from './ModelUpdateStatus';

interface Props {
  item: IKhachHang;
}
const ItemHoaDonKhachHang = ({ item }: Props): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [orderList, setOrderList] = React.useState<IOrderUser[]>([]);
  const [openModalId, setOpenModalId] = React.useState<number | null>(null);
  const [openModalIdUpdate, setOpenModalIdUpdate] = React.useState<
    number | null
  >(null);
  const [status, setStatus] = React.useState<EOrderStatus>(EOrderStatus.ALL);
  const handleOpenModal = (userId: number) => {
    setOpenModalId((prevId) => (prevId === userId ? null : userId));
  };
  const handleOpenModalUpdate = (userId: number) => {
    setOpenModalIdUpdate((prevId) => (prevId === userId ? null : userId));
  };

  const handleChangeStatus = (status: EOrderStatus) => {
    setStatus(status);
  };

  React.useEffect(() => {
    const fetchOrders = async () => {
      const res = await get_all_order_by_user(item.id || 0);
      if (res.statusCode === 200) {
        if (status === EOrderStatus.ALL) {
          setOrderList(res.data);
        } else {
          setOrderList(
            res.data.filter((order: IOrderUser) => order.status === status),
          );
        }
      }
    };
    handleStateApi(fetchOrders);
  }, [status, openModalIdUpdate]);
  return (
    <>
      <TableRow
        key={item.id}
        className="border-l-2 border-t-2 border-r-2 border-b-0 border-black"
      >
        <TableCell className="font-medium">{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.phone}</TableCell>
        <TableCell>{item.gender}</TableCell>
        <TableCell>{item.address}</TableCell>
      </TableRow>
      <TableRow className=" border-b-2 border-t-0 border-l-2 border-r-2 border-black">
        <TableCell colSpan={6} className="px-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-3 w-full items-center justify-center flex flex-col gap-2 ">
                <span className="font-bold">Danh sách hóa đơn</span>
                <span>
                  <ChevronsDown className="animate-bounce" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="py-2 flex flex-col gap-2">
                  <label htmlFor="" className="font-bold">
                    Trạng thái
                  </label>
                  <select
                    name=""
                    id=""
                    value={status}
                    onChange={(e) => {
                      handleChangeStatus(e.target.value as EOrderStatus);
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
                <div className="min-h-[300px]">
                  <Table className="w-full h-full ">
                    <TableRow>
                      <TableHead className="w-[100px]"># ID hóa đơn</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Tổng tiền</TableHead>
                      <TableHead>Địa chỉ giao</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                    <TableBody>
                      {stateApi.loading ? (
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
                            <TableCell className="font-medium">
                              {item.id}
                            </TableCell>
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
                                      onClick={() =>
                                        handleOpenModal(item.id || 0)
                                      }
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
                                    orderStatus={String(item.status)}
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
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TableCell>
      </TableRow>
    </>
  );
};
export default ItemHoaDonKhachHang;
