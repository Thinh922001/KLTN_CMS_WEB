import React from 'react';
import useFetch from '@/hooks/useFetch';
import { CheckSquare2, Loader, Square } from 'lucide-react';
import { deleteBanner, get_banner, uploadBanner } from '@/api/banner';
import { toastMessage } from '@/utils/toastHelper';
import { IBanner } from '@/Types/banner';

const Banner = () => {
  const [stateBanner, handleStateBanner] = useFetch();
  const [stateBannerUpload, handleStateBannerUpload] = useFetch();
  const [stateDel, handleStateDel] = useFetch();
  const [banners, setBanner] = React.useState<IBanner[]>([]);
  const [bannerDelId, setBannerDelId] = React.useState<number[]>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const [reset, setReset] = React.useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const fetch = () => {
        handleStateBannerUpload(async () => {
          const res = await uploadBanner(Array.from(files));
          if (res.statusCode == 200) {
            setFiles([]);
            setReset((e) => !e);
            toastMessage('Thêm banner thành công', 'success');
          } else {
            toastMessage(res.message, 'error');
          }
        });
      };
      await fetch();
    }
  };

  const toggleCheckAllImage = () => {
    if (bannerDelId.length === banners.length) {
      setBannerDelId([]);
    } else {
      setBannerDelId([...banners.map((e) => e.id)]);
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
      const res = await deleteBanner(bannerDelId);
      if (res.statusCode == 200) {
        setReset((e) => !e);
        toastMessage('Xóa banner thành công', 'success');
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  React.useEffect(() => {
    const fetch = () => {
      handleStateBanner(async () => {
        const res = await get_banner();
        if (res.statusCode == 200) {
          setBanner(res.data);
        } else {
          setBanner([]);
        }
      });
    };
    fetch();
  }, [reset]);

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-8">
        <h2 className="text-2xl font-bold py-5">Hình ảnh</h2>
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

export default Banner;
