import { create_category, get_all_cate_type } from '@/api/category';
import useFetch from '@/hooks/useFetch';
import { ICateType } from '@/Types/Category';
import { toastMessage } from '@/utils/toastHelper';
import { Loader } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const AddLoaiSanPham = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();

  const [staApiCate, handleStateApiCate] = useFetch();

  const [name, setName] = React.useState<string>('');
  const [listCateType, setListCateType] = React.useState<ICateType[]>([]);
  const [cateTypeChoice, setCateTypeChoice] = React.useState<ICateType | null>(
    null,
  );

  const navigate = useNavigate();
  const handleSubmit = () => {
    handleStateApi(async () => {
      if (!cateTypeChoice) return;
      const res = await create_category({
        name,
        cateTypeId: cateTypeChoice?.id || 0,
      });
      if (res.statusCode == 200) {
        toastMessage('Thêm loại sản phẩm thành công', 'success');
        setName('');
        return;
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  React.useEffect(() => {
    handleStateApiCate(async () => {
      const resCateType = await get_all_cate_type();
      if (resCateType.statusCode == 200) {
        setListCateType(resCateType.data);
        setCateTypeChoice(resCateType.data[0]);
      } else {
        toastMessage(resCateType.message, 'error');
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Thêm một danh mục mới
            </h3>
          </div>
          <div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên danh mục
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className='mb-4.5 flex flex-col gap-2 "'>
                <span className="font-bold">Loại danh mục</span>
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    setCateTypeChoice(listCateType[Number(e.target.value)])
                  }
                  className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
                >
                  {listCateType.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
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
export default AddLoaiSanPham;
