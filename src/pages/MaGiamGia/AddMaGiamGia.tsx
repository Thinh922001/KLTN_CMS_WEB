import { ChevronDown, Loader } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { create_coupon } from '@/api/coupon';
import useFetch from '@/hooks/useFetch';
import { ICouponCreate } from '@/Types/Coupon';
import { toastMessage } from '@/utils/toastHelper';

const AddMaGiamGia = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [coupon, setCoupon] = React.useState<ICouponCreate>({
    code: '',
    discountValue: 0,
    discountType: 'percentage',
    isActive: true,
    usageLimit: 0,
    validityPeriodInDays: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setCoupon({
        ...coupon,
        [name]: target.checked,
      });
    } else {
      const parsedValue = ['discountValue', 'usageLimit', 'validityPeriodInDays'].includes(name)
        ? Number(value)
        : value;
      setCoupon({
        ...coupon,
        [name]: parsedValue,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleStateApi(async () => {
      if (!coupon) return;
      coupon.isActive= Boolean(coupon.isActive);
      const res = await create_coupon(coupon);
      if (res.statusCode === 200) {
        toastMessage("Thêm mã khuyến mãi thành công", 'success');
        navigate("/magiamgia");
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Thêm một mã giảm giá mới</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full ">
                <label className="mb-2.5 block text-black dark:text-white">
                  CODE
                </label>
                <input
                  type="text"
                  name="code"
                  value={coupon.code}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Số ngày hiệu lực mã từ khi tạo khuyến mãi
              </label>
              <input
                type="number"
                name="validityPeriodInDays"
                value={coupon.validityPeriodInDays}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Số lượng tối đa áp dụng mã
              </label>
              <input
                type="number"
                name="usageLimit"
                value={coupon.usageLimit}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Loại khuyến mãi
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="discountType"
                  value={coupon.discountType}
                  onChange={handleChange}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="percentage">Phần trăm</option>
                  <option value="amount">Tiền</option>
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <ChevronDown />
                </span>
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Trạng thái
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="isActive"
                  value={String(coupon.isActive)}
                  onChange={handleChange}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="true">Đang hiển thị</option>
                  <option value="false">Không hiển thị</option>
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <ChevronDown />
                </span>
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Giá trị
              </label>
              <input
                type="number"
                name="discountValue"
                value={coupon.discountValue}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default AddMaGiamGia;
