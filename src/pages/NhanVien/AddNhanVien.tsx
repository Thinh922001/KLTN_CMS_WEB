import { register } from '@/api/admin';
import useFetch from '@/hooks/useFetch';
import { usePermission } from '@/hooks/usePermission';
import { ICAdmin } from '@/Types/Admin';
import { toastMessage } from '@/utils/toastHelper';
import { Loader } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const AddNhanVien = (): JSX.Element => {
  usePermission();
  const [stateApi, handleStateApi] = useFetch();
  const navigate = useNavigate();
  const [employee, setEmployee] = React.useState<ICAdmin>({
    name: '',
    email: '',
    roleName: 'ADMIN',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = React.useState<Partial<ICAdmin>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ICAdmin> = {};
    if (!employee.name.trim()) newErrors.name = 'Tên không được để trống';
    if (!employee.email.trim()) newErrors.email = 'Email không được để trống';
    else if (!/\S+@\S+\.\S+/.test(employee.email))
      newErrors.email = 'Email không hợp lệ';
    if (!employee.password.trim())
      newErrors.password = 'Mật khẩu không được để trống';
    if (employee.password !== employee.confirmPassword)
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetEmployee = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleStateApi(async () => {
        const res = await register(employee);
        if (res.statusCode === 200) {
          toastMessage('Thêm nhân viên thành công', 'success');
          navigate('/nhanvien');
        } else {
          toastMessage(res.message, 'error');
        }
      });
    } else {
      alert('Dữ liệu không hợp lệ!');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Thêm một nhân viên mới
            </h3>
          </div>
          <form action="#" onSubmit={handleAdd}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full ">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleSetEmployee}
                    placeholder="Nhập tên nhân viên"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleSetEmployee}
                  placeholder="Email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full mb-4.5 ">
                <label className="mb-2.5 block text-black dark:text-white">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleSetEmployee}
                  placeholder="Nhập mật khẩu"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full mb-4.5 ">
                <label className="mb-2.5 block text-black dark:text-white">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={employee.confirmPassword}
                  onChange={handleSetEmployee}
                  placeholder="Xác nhận mật khẩu"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Chọn quyền
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={employee.roleName}
                    name="roleName"
                    onChange={handleSetEmployee}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPPER_ADMIN">SUPPER ADMIN</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
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
    </>
  );
};
export default AddNhanVien;
