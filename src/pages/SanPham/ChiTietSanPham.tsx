import { get_all_brand } from '@/api/brand';
import { get_all_category } from '@/api/category';
import {
  get_product_by_id,
  update_product,
  upload_image_product,
} from '@/api/product';
import useFetch from '@/hooks/useFetch';
import { IBrand } from '@/Types/Brand';
import { ICategory } from '@/Types/Category';
import { IProduct, IProductGet, IProductUpdate } from '@/Types/Product';
import { toastMessage } from '@/utils/toastHelper';
import { ChevronDown, Loader, LogIn } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableListProductDetai from './TableListProductDetail';
import TableListProductDetail from './TableListProductDetail';
const ChiTietSanPhamPage = (): JSX.Element => {
  const { id, brand_id, cate_id } = useParams();
  const [stateApi, handleStateApi] = useFetch();
  const [product, setProduct] = React.useState<IProductGet>();
  const [productUpdate, setProductUpdate] = React.useState<IProductUpdate>({});
  const navigate = useNavigate();
  const [image, setImage] = React.useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = () => {
    handleStateApi(async () => {
      productUpdate.starRate = Number(productUpdate.starRate);
      productUpdate.discountPercent = Number(productUpdate.discountPercent);
      productUpdate.starRate = Number(productUpdate.starRate);
      productUpdate.price = Number(productUpdate.price);
      productUpdate.oldPrice = Number(productUpdate.oldPrice);
      const res = await update_product(Number(id), productUpdate);
      if (res.statusCode === 200) {
        toastMessage('Cập nhập thành công', 'success');
        console.log(image);

        if (image) {
          const resImage = await upload_image_product(Number(id), image);
          if (resImage.statusCode === 200) {
            toastMessage(
              'Cập nhập hình ảnh cho sản phẩm thành công',
              'success',
            );
          } else {
            toastMessage(resImage.message, 'error');
          }
        } else {
          navigate('/sanpham');
        }
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };
  console.log(productUpdate);

  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const res = await get_product_by_id(Number(id));
        if (res.statusCode === 200) {
          setProduct(res.data);
          setProductUpdate({
            brandId: Number(brand_id),
            cateId: Number(cate_id),
            product_code: res.data.product_code,
            productName: res.data.productName,
            price: res.data.price,
            discountPercent: res.data.discountPercent,
            oldPrice: res.data.oldPrice,
            starRate: res.data.starRate,
            totalVote: res.data.totalVote,
            tabs: res.data.tabs,
          });
        } else {
          toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
        }
      });
    };
    fetch();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Chi tiết sản phẩm {product?.productName}
            </h3>
          </div>
          <div>
            <div className="flex justify-center items-end">
              <div
                style={{
                  backgroundImage: image
                    ? `url(${URL.createObjectURL(image)})`
                    : `url(${product?.img})`,
                }}
                className="w-[300px] h-[300px] bg-cover bg-center"
              />
              <div>
                <input type="file" onChange={handleImageChange} />
              </div>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Mã code sản phẩm
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={productUpdate?.product_code}
                      readOnly
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên sản phẩm
                  </label>
                  <input
                    value={productUpdate?.productName}
                    onChange={(e) =>
                      setProductUpdate({
                        ...productUpdate,
                        productName: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid-grid-cols-2 gap-2">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giá sản phẩm
                  </label>
                  <input
                    type="text"
                    value={productUpdate?.price}
                    onChange={(e) =>
                      setProductUpdate({
                        ...productUpdate,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giá cũ
                  </label>
                  <input
                    type="text"
                    value={productUpdate?.oldPrice}
                    onChange={(e) =>
                      setProductUpdate({
                        ...productUpdate,
                        oldPrice: Number(e.target.value),
                      })
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tổng số lượt đánh giá
                  </label>
                  <input
                    value={productUpdate?.totalVote}
                    onChange={(e) =>
                      setProductUpdate({
                        ...productUpdate,
                        totalVote: Number(e.target.value),
                      })
                    }
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Số sao đánh giá
                  </label>
                  <input
                    value={productUpdate?.starRate}
                    onChange={(e) =>
                      setProductUpdate({
                        ...productUpdate,
                        starRate: Number(e.target.value),
                      })
                    }
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phần trăm giảm giá
                  </label>
                  <input
                    value={productUpdate?.discountPercent}
                    onChange={(e) =>
                      setProductUpdate({
                        ...productUpdate,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tag nhãn
                </label>
                <div className="flex items-center gap-3 py-2">
                  {productUpdate?.tabs?.map((item, index) => (
                    <span
                      key={index}
                      className="bg-black text-white px-2 py-1 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <textarea
                  rows={6}
                  value={productUpdate?.tabs?.join(', ')}
                  onChange={(e) =>
                    setProductUpdate({
                      ...productUpdate,
                      tabs: e.target.value.split(', '),
                    })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                onClick={handleSubmit}
              >
                {stateApi.loading ? (
                  <div className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                    <Loader className="animate-spin" />
                  </div>
                ) : (
                  <span>Lưu</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <TableListProductDetail product={product ?? {}} />
      </div>
    </>
  );
};
export default ChiTietSanPhamPage;
