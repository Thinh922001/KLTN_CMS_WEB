import { get_all_brand } from '@/api/brand';
import { get_all_category } from '@/api/category';
import { create_product } from '@/api/product';
import useFetch from '@/hooks/useFetch';
import { IBrand } from '@/Types/Brand';
import { ICategory } from '@/Types/Category';
import { IProductCreate } from '@/Types/Product';
import { generateIdWithAlphabet } from '@/utils/generateId';
import { toastMessage } from '@/utils/toastHelper';
import { ChevronDown, Loader, RefreshCcw } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const AddSanPham = (): JSX.Element => {
  const [productAdd, setProductAdd] = React.useState<IProductCreate>({
    productCode: generateIdWithAlphabet('SP', 10),
    tabs: [],
    productName: 'Tên sản phẩm',
    labelsId: [1],
    variants: [
      { name: 'size', images: [], options: ['256GB', '512GB', '1TB'] },
      {
        name: 'color',
        images: ['#bab4a9', '#464749', '#4f5765', '#f2f1ec'],
        options: ['Titan tự nhiên', 'Titan đen', 'Titan xanh', 'Titan trắng'],
      },
    ],
    totalVote: 25,
    starRate: 4.1,
    price: 8290000,
    discountPercent: 17,
    oldPrice: 9900000,
    cateId: -1,
    brandId: -1,
  });
  const [cateChoice, setCateChoice] = React.useState<ICategory>();
  const [brandChoice, setBrandChoice] = React.useState<IBrand>();
  const [cate, setCate] = React.useState<ICategory[]>([]);
  const [brand, setBrand] = React.useState<IBrand[]>([]);
  const navigate = useNavigate();
  const [stateApi, handleStateApi] = useFetch();
  const handleSubmit = () => {
    handleStateApi(async () => {
      const res = await create_product(productAdd);
      if (res.statusCode === 200) {
        toastMessage('Thêm sản phẩm thành công', 'success');
        navigate('/sanpham');
        return;
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };
  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const res = await get_all_category();
        const resBrand = await get_all_brand();
        if (res.statusCode === 200 && resBrand.statusCode === 200) {
          setCate(res.data);
          setBrand(resBrand.data);
          setBrandChoice(resBrand.data[0]);
          setCateChoice(res.data[0]);
          setProductAdd({
            ...productAdd,
            cateId: res.data[0].id,
            brandId: resBrand.data[0].id,
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
              Thêm một sản phẩm mới
            </h3>
          </div>
          <div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Mã code sản phẩm
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={productAdd.productCode}
                      onChange={(e) =>
                        setProductAdd({
                          ...productAdd,
                          productCode: e.target.value,
                        })
                      }
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <button
                      className="bg-black text-white p-2 rounded-md"
                      onClick={() =>
                        setProductAdd({
                          ...productAdd,
                          productCode: generateIdWithAlphabet('SP', 10),
                        })
                      }
                    >
                      <RefreshCcw />
                    </button>
                  </div>
                </div>
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên sản phẩm
                  </label>
                  <input
                    value={productAdd.productName}
                    onChange={(e) =>
                      setProductAdd({
                        ...productAdd,
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
                    value={productAdd.price}
                    onChange={(e) =>
                      setProductAdd({
                        ...productAdd,
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
                    value={productAdd.oldPrice}
                    onChange={(e) =>
                      setProductAdd({
                        ...productAdd,
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
                    value={productAdd.totalVote}
                    onChange={(e) =>
                      setProductAdd({
                        ...productAdd,
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
                    value={productAdd.starRate}
                    onChange={(e) =>
                      setProductAdd({
                        ...productAdd,
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
                    value={productAdd.discountPercent}
                    onChange={(e) =>
                      setProductAdd({
                        ...productAdd,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Loại sản phẩm
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={cateChoice?.id}
                      onChange={(e) =>
                        setCateChoice(
                          cate.find(
                            (item) => item.id === Number(e.target.value),
                          ),
                        )
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      {cate.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <ChevronDown />
                    </span>
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nhãn hàng
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={brandChoice?.id}
                      onChange={(e) =>
                        setBrandChoice(
                          brand.find(
                            (item) => item.id === Number(e.target.value),
                          ),
                        )
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      {brand.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <ChevronDown />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tag nhãn
                </label>
                <div className="flex items-center gap-3 py-2">
                  {productAdd.tabs?.map((item, index) => (
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
                  value={productAdd.tabs?.join(', ')}
                  onChange={(e) =>
                    setProductAdd({
                      ...productAdd,
                      tabs: e.target.value.split(', '),
                    })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {productAdd?.variants?.map((item, index) => (
                  <div className="mb-4.5 flex flex-col gap-2" key={index}>
                    <label htmlFor="" className="text-black font-bold">
                      {item.name}
                    </label>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">images</label>
                      <div className="flex items-center gap-3 py-2">
                        {item.images?.map((item, index) => (
                          <span
                            key={index}
                            className="bg-black text-white px-2 py-1 text-sm rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={item.images?.join(', ')}
                        onChange={(e) =>
                          setProductAdd({
                            ...productAdd,
                            variants: productAdd?.variants?.map((item, index) => {
                              if (item.name === "size") {
                                return {
                                  ...item,
                                  images: e.target.value.split(', '),
                                };
                              }
                              return item;
                            }),
                            })
                        }
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">options</label>
                      <div className="flex items-center gap-3 py-2">
                        {item.options?.map((item, index) => (
                          <span
                            key={index}
                            className="bg-black text-white px-2 py-1 text-sm rounded-full"
                          >
                            {item} 
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={item.options?.join(', ')}
                        onChange={(e) =>
                          setProductAdd({
                            ...productAdd,
                            variants: productAdd?.variants?.map((item, index) => {
                              if (item.name === "color") {
                                return {
                                  ...item,
                                  options: e.target.value.split(', '),
                                };
                              }
                              return item;
                            }), })
                        }
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                ))}
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
                  <span>Thêm mới</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddSanPham;
