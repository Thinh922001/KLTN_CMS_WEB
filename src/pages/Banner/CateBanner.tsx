import { delBannerCate, getBannerCate, uploadBannerCate } from '@/api/banner';
import { get_all_category } from '@/api/category';
import useFetch from '@/hooks/useFetch';
import { IBanner } from '@/Types/banner';
import { ICategory } from '@/Types/Category';
import { toastMessage } from '@/utils/toastHelper';
import { CheckSquare2, Loader, Square } from 'lucide-react';
import React, { version } from 'react';

const CateBanner = () => {
  const [stateBanner, handleStateBanner] = useFetch();
  const [reset, setReset] = React.useState<boolean>(false);
  const [cate, setCate] = React.useState<ICategory[]>([]);
  const [cateActive, setCateActive] = React.useState<ICategory | null>(null);
  const [banners, setBanner] = React.useState<IBanner[]>([]);
  const [bannerDelId, setBannerDelId] = React.useState<number[]>([]);
  const [stateDel, handleStateDel] = useFetch();
  const [stateBannerUpload, handleStateBannerUpload] = useFetch();

  const [files, setFile] = React.useState<File[]>([]);

  const toggleCheckAllImage = () => {
    if (bannerDelId.length === banners.length) {
      setBannerDelId([]);
    } else {
      setBannerDelId([...banners.map((e) => e.id)]);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      setFile(Array.from(event.target.files));
    }
  };

  const handleToggleBannerId = (id: number) => {
    setBannerDelId((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((bannerId) => bannerId !== id)
        : [...prevIds, id],
    );
  };

  const handleDelete = () => {
    handleStateDel(async () => {
      if (!bannerDelId.length) return;
      const res = await delBannerCate(bannerDelId);
      if (res.statusCode == 200) {
        setReset((e) => !e);
        toastMessage('Xóa banner thành công', 'success');
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  React.useEffect(() => {
    if (files.length && cateActive) {
      handleStateBannerUpload(async () => {
        const res = await uploadBannerCate(cateActive.id, files);
        if (res.statusCode == 200) {
          setReset((e) => !e);
          toastMessage('Thêm banner thành công', 'success');
        } else {
          toastMessage(res.message, 'error');
        }
      });
    }
  }, [files]);

  React.useEffect(() => {
    handleStateBanner(async () => {
      if (cateActive) {
        const resBanner = await getBannerCate(cateActive.id);
        if (resBanner.statusCode == 200) {
          setBanner(resBanner.data);
        } else {
          toastMessage(resBanner.message, 'error');
        }
      }
    });
  }, [cateActive]);

  React.useEffect(() => {
    if (cateActive) {
      handleStateBanner(async () => {
        const resBanner = await getBannerCate(cateActive.id);
        if (resBanner.statusCode == 200) {
          setBanner(resBanner.data);
        } else {
          toastMessage(resBanner.message, 'error');
        }
      });
    }
  }, [reset]);

  React.useEffect(() => {
    handleStateBanner(async () => {
      const res = await get_all_category();
      if (res.statusCode == 200) {
        setCate(res.data);
        setCateActive(res.data[0]);
        const resBanner = await getBannerCate(res.data[0].id);
        if (resBanner.statusCode == 200) {
          setBanner(resBanner.data);
        } else {
          toastMessage(resBanner.message, 'error');
        }
      } else {
        toastMessage(res.message, 'error');
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12">
        <h2 className="text-2xl font-bold py-5">Banner danh mục</h2>
      </div>
      <div className="col-span-4">
        <div className='mb-4.5 flex flex-col gap-2 "'>
          <span className="font-bold">Loại danh mục</span>
          <select
            name=""
            id=""
            onChange={(e) => setCateActive(cate[Number(e.target.value)])}
            className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
          >
            {cate.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-span-12">
        <div className="flex items-center gap-10">
          <div
            onClick={toggleCheckAllImage}
            className="flex items-center gap-3 cursor-pointer"
          >
            {bannerDelId.length === banners.length ? (
              <CheckSquare2 />
            ) : (
              <Square />
            )}

            <span className="text-lg font-semibold">Chọn tất cả</span>
          </div>
          <button
            onClick={handleDelete}
            className={`p-2 rounded-md border border-stroke bg-red-700 text-white cursor-pointer ${
              !bannerDelId.length && 'opacity-50 !cursor-default'
            }`}
            disabled={!bannerDelId.length}
          >
            {stateDel.loading ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin" />
              </div>
            ) : (
              'Xóa'
            )}
          </button>

          <button
            className={`p-1 rounded-md border-2 border-transparent bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold hover:from-red-700 hover:to-red-900 transition-opacity duration-300 ease-in-out `}
            disabled={true}
          >
            {stateBannerUpload.loading ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin" />
              </div>
            ) : (
              <>
                <input
                  id="fileUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <label htmlFor="fileUpload">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Thêm Banner
                  </div>
                </label>
              </>
            )}
          </button>
        </div>
      </div>
      {stateBanner.loading ? (
        <div className="flex items-center justify-center col-span-12 ">
          <Loader className="animate-spin" />
        </div>
      ) : banners.length > 0 ? (
        banners.map((e) => (
          <>
            <div
              key={e.id}
              className="col-span-12  row-span-3"
              onClick={() => handleToggleBannerId(e.id)}
            >
              <div
                className={`p-2 rounded-md border-4 cursor-pointer  ${
                  bannerDelId.includes(e?.id)
                    ? 'border-sky-600'
                    : ' border-stone-100'
                }`}
              >
                <img
                  src={e.img}
                  alt=""
                  className="w-full h-full rounded-sm object-cover"
                />
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="col-span-12  p-2 rounded-md border border-stroke flex items-center justify-center">
          <span className="text-2xl font-bold">Không có hình ảnh nào</span>
        </div>
      )}
    </div>
  );
};

export default CateBanner;
