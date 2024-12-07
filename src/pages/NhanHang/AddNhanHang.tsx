import { create_brand } from '@/api/brand';
import useFetch from '@/hooks/useFetch';
import { toastMessage } from '@/utils/toastHelper';
import { Loader } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const AddNhanHang = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [name, setName] = React.useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = () => {
    handleStateApi(async () => {
      const res = await create_brand(name);
      if (res.statusCode == 200) {
        toastMessage('Thêm nhãn hàng thành công', 'success');
        navigate('/nhanhang');
        return;
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };
  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Thêm một nhãn hàng mới
            </h3>
          </div>
          <div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên nhãn hàng mới
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
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
export default AddNhanHang;
