import {
  delete_productDetail_image,
  get_productDetail_by_id,
  update_productDetail,
  upload_productDetail_image,
} from '@/api/productDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch';
import { IProductDetailGet } from '@/Types/ProductDetail';
import { toastMessage } from '@/utils/toastHelper';
import {
  CheckSquare2,
  ChevronLeft,
  ImagePlus,
  Loader,
  Square,
} from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const ListChiTietSanPham = (): JSX.Element => {
  const { product_id } = useParams();
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiDelete, handleStateApiDelete] = useFetch();
  const [stateApiUpdate, handleStateApiUpdate] = useFetch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [productDetail, setProductDetail] = React.useState<IProductDetailGet>(
    {},
  );
  const [listIdImg, setListIdImg] = React.useState<string[]>([]);
  const [image, setImage] = React.useState<File | null>(null);
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  const toggleProductImage = (id: string) => {
    if (listIdImg.includes(id)) {
      setListIdImg(listIdImg.filter((item) => item !== id));
    } else {
      setListIdImg([...listIdImg, id]);
    }
  };

  const toggleCheckAllImage = () => {
    if (listIdImg.length === productDetail?.productDetailsImg?.length) {
      setListIdImg([]);
    } else {
      setListIdImg(
        productDetail?.productDetailsImg?.map((item) => item.id || '') || [],
      );
    }
  };

  const handleSubmitImage = () => {
    handleStateApi(async () => {
      if (!image) {
        toastMessage('Chưa có hình ảnh nào được tải lên', 'error');
        return;
      }
      const res = await upload_productDetail_image(Number(product_id), image);
      if (res.statusCode === 200) {
        toastMessage('Thêm hình ảnh cho sản phẩm thành công', 'success');
        setImage(null);
        setLoading((r) => !r);
      }
    });
  };
  const handleDeleteImage = () => {
    handleStateApiDelete(async () => {
      const res = await delete_productDetail_image({
        productDetailId: Number(product_id) || -1,
        delImgId: listIdImg,
      });
      if (res.statusCode === 200) {
        toastMessage('Xóa hình ảnh cho sản phẩm thành công', 'success');
        setLoading((r) => !r);
      }
    });
  };

  const handleSubmitUpdate = () => {
    handleStateApiUpdate(async () => {
      const { price, oldPrice, discountPercent, stock } = productDetail;
      const res = await update_productDetail(Number(product_id), {
        price: Number(price),
        oldPrice: Number(oldPrice),
        discountPercent: Number(discountPercent),
        stock: Number(stock),
      });

      if (res.statusCode === 200) {
        toastMessage('Cập nhập thông tin sản phẩm thành công', 'success');
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };
  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const resProduct = await get_productDetail_by_id(Number(product_id));
        if (resProduct.statusCode === 200) {
          setProductDetail(resProduct.data);
        }
      });
    };
    fetch();
  }, [loading]);

  return (
    <div>
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Trở về</span>
          </button>
        </div>
        <div className="col-span-8">
          <h2 className="text-2xl font-bold py-5">Hình ảnh</h2>
          <div className="p-4 flex items-center gap-10">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleCheckAllImage}
            >
              {listIdImg.length === productDetail?.productDetailsImg?.length ? (
                <CheckSquare2 />
              ) : (
                <Square />
              )}
              <span className="text-lg font-semibold">Chọn tất cả</span>
            </div>
            <button
              className={`p-2 rounded-md border border-stroke bg-red-700 text-white ${
                listIdImg.length < 1 && 'opacity-50'
              }`}
              disabled={listIdImg.length < 1}
              onClick={handleDeleteImage}
            >
              {stateApiDelete.loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                'Xóa'
              )}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {productDetail.productDetailsImg &&
            productDetail?.productDetailsImg?.length < 1 ? (
              <div className="p-2 rounded-md border border-stroke flex items-center justify-center">
                <span className="text-2xl font-bold">
                  Không có hình ảnh nào
                </span>
              </div>
            ) : (
              productDetail.productDetailsImg?.map((item, index) => (
                <div
                  className={`p-2 rounded-md border-4  ${
                    listIdImg.includes(item?.id || '')
                      ? 'border-sky-600'
                      : ' border-stone-100'
                  } cursor-pointer`}
                  onClick={() => toggleProductImage(item?.id || '')}
                >
                  <img
                    src={item?.img || ''}
                    alt=""
                    className="w-20 h-20 rounded-sm object-contain "
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-span-4 flex items-center flex-col justify-center">
          <div
            style={{
              backgroundImage: image
                ? `url(${URL.createObjectURL(image)})`
                : '',
            }}
            className="border relative border-stroke w-full aspect-square bg-cover bg-no-repeat bg-center rounded-md"
          >
            <span
              className="absolute w-12 h-12 rounded-full border border-solid flex items-center justify-center z-50 bottom-1 right-1 cursor-pointer bg-white"
              onClick={handleIconClick}
            >
              <ImagePlus />
            </span>
          </div>
          <div className="flex items-center justify-center py-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <button
              onClick={handleSubmitImage}
              className="bg-black px-3 py-1 rounded-md text-white w-full"
            >
              {stateApi.loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                'Thêm hình ảnh vào sản phẩm'
              )}
            </button>
          </div>
        </div>
        <div className="col-span-12">
          <div className="py-2">
            <h2 className="font-bold text-2xl">Thông tin sản phẩm</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <span>Giá</span>
              <Input
                value={productDetail?.price}
                type="number"
                onChange={(e) =>
                  setProductDetail({
                    ...productDetail,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Giá cũ</span>
              <Input 
                value={productDetail?.oldPrice}
                type="number"
                onChange={(e) =>
                  setProductDetail({
                    ...productDetail,
                    oldPrice: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Phần trăm giảm</span>
              <Input 
                value={productDetail?.discountPercent}
                type="number"
                onChange={(e) =>
                  setProductDetail({
                    ...productDetail,
                    discountPercent: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>Số lượng tồn tại</span>
              <Input 
                value={productDetail?.stock}
                type="number"
                onChange={(e) =>
                  setProductDetail({
                    ...productDetail,
                    stock: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="col-span-2 py-3 flex items-center justify-center">
              <Button className='' onClick={handleSubmitUpdate}>
              {stateApiUpdate.loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                'Lưu thông tin'
              )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListChiTietSanPham;
