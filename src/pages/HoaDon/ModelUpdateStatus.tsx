import {
  get_all_order_detail_by_order,
  update_order_status,
} from '@/api/order';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import { EOrderStatus } from '@/Types/order';
import { IProductDetailGetFromUser } from '@/Types/ProductDetail';
import { formatMoney } from '@/utils/formatMoney';
import { toastMessage } from '@/utils/toastHelper';
import { Loader, X } from 'lucide-react';
import React from 'react';
export interface Props {
  orderId: number;
  onClose: () => void;
}
const ModelUpdateStatus = ({ orderId, onClose }: Props): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [status, setStatus] = React.useState<EOrderStatus>(
    EOrderStatus.PENDING,
  );
  const [productDetail, setProductDetail] =
    React.useState<IProductDetailGetFromUser>();

  const handleUpdateOrderStatus = async () => {
    console.log(status);

    handleStateApi(async () => {
      const res = await update_order_status(Number(orderId), status);
      if (res.statusCode === 200) {
        toastMessage('Cập nhập thành công trạng thái', 'success');
        onClose();
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const resProduct = await get_all_order_detail_by_order(Number(orderId));
        if (resProduct.statusCode === 200) {
          setProductDetail(resProduct.data);
        } else {
          toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
        }
      });
    };
    fetch();
  }, []);
  return (
    <div className="absolute">
      <div
        className="absolute z-20 flex gap-2 items-center top-5 right-5"
        style={{ zIndex: 1001 }}
      >
        <span className="cursor-pointer" onClick={onClose}>
          <X className="text-black" />
        </span>
      </div>
      <div
        className="rounded-md p-3 absolute top-0 right-full bg-white border border-solid min-w-[500px]"
        style={{ zIndex: 1000 }}
      >
        <h3 className="text-center font-bold">Trạng thái hóa đơn</h3>
        <div className="w-full">
          {stateApi.loading ? (
            <div className="flex justify-center items-center ">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-start gap-3">
                <span>
                  Mã hóa đơn: #<b>{orderId}</b>
                </span>
                <span>
                  Tên khách hàng: <b>{productDetail?.name}</b>
                </span>
                <span>
                  Ngày thanh toán hóa đơn: <b>{productDetail?.receiveDate}</b>
                </span>
                <span>
                  Tổng tiền hóa đơn:{' '}
                  <b>{formatMoney(productDetail?.totalAmount ?? '0')}</b>
                </span>
                <span>
                  Giá thanh toán cuối cùng:{' '}
                  <b>{formatMoney(productDetail?.finalAmount ?? '0')}</b>
                </span>
              </div>
              <div className="flex flex-col items-start gap-3">
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
                  className="p-2 w-full rounded-md border border-stroke dark:border-strokedark border-black"
                >
                  <option value={EOrderStatus.PENDING}>Pending</option>
                  <option value={EOrderStatus.DELIVERED}>Delivered</option>
                  <option value={EOrderStatus.SHIPPED}>Shipped</option>
                  <option value={EOrderStatus.CONFIRMED}>Confirmed</option>
                  <option value={EOrderStatus.CANCELLED}>Cancelled</option>
                  <option value={EOrderStatus.RETURNED}>Returned</option>
                  <option value={EOrderStatus.REFUNDED}>Refunded</option>
                </select>
                <div className="flex justify-end w-full">
                  <Button className="w-full" onClick={handleUpdateOrderStatus}>
                    Cập nhập trạng thái
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ModelUpdateStatus;
