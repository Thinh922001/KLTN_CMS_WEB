import { get_all_order_detail_by_order } from '@/api/order';
import { get_productDetail_by_id } from '@/api/productDetail';
import { TableCell } from '@/components/ui/table'
import useFetch from '@/hooks/useFetch';
import { IProductDetailGetFromUser, IProductDetailGetFromUserItem } from '@/Types/ProductDetail';
import { formatMoney } from '@/utils/formatMoney';
import { toastMessage } from '@/utils/toastHelper';
import { Eye, Loader, X } from 'lucide-react';
import React from 'react'

export interface Props {
  orderId: number,
  onClose: () => void
}

const ItemOrderDetail = ({ orderId, onClose }: Props): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();

  const [productDetail, setProductDetail] = React.useState<IProductDetailGetFromUser>();
  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const resProduct = await get_all_order_detail_by_order(Number(orderId));
        if (resProduct.statusCode === 200) {
          setProductDetail(resProduct.data);
        }else{
          toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
        }
      });
    }
    fetch();
  },[])
  return (
    <div className='absolute'>
      <div className="absolute z-20 flex gap-2 items-center top-5 right-5" style={{zIndex:1001}}>
        <span
          className="cursor-pointer"
          onClick={onClose}
        >
          <X className="text-black" />
        </span>
      </div>
      <div className='rounded-md p-3 absolute top-0 right-full bg-white border border-solid min-w-[500px]' style={{zIndex:1000}}>
        <h3 className='text-center font-bold'>Chi tiết hóa đơn</h3>
        <div className='w-full'>
            {
              stateApi.loading ? (
                <div className='flex justify-center items-center '>
                    <Loader className='animate-spin'/>
                </div>
              ):(
                <>
                  <div className='flex flex-col items-start gap-3'>
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
                    Tổng tiền hóa đơn: <b>{formatMoney(productDetail?.totalAmount ?? '0')}</b> 
                    </span>
                    <span>
                    Giá thanh toán cuối cùng: <b>{formatMoney(productDetail?.finalAmount ?? '0')}</b> 
                    </span>
                  </div>
                  <div className='flex flex-col py-4'>
                    {
                      productDetail?.items?.map((item:IProductDetailGetFromUserItem, index) => (
                        <div key={index} className='flex gap-3 items-center border border-black p-1 justify-evenly rounded-md'>
                          <img src={item.img} alt="" className='w-12 h-12 object-cover rounded-md'/>
                          <span className='text-black font-bold'>
                            {item.name}
                          </span>
                          <span>
                            x {item.quantity}
                          </span>
                          <span className='text-red-700 font-bold'>
                            {formatMoney(productDetail?.totalAmount ?? '0')}
                          </span>
                        </div>
                      ))
                    }
                  </div>
                
                </>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default ItemOrderDetail;
