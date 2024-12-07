import { ICAdmin } from '@/Types/Admin';
import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';

export const get_admin = async (take: number = 5, skip: number = 0) => {
  return await apiRequestRefeshToken(
    `/admin?take=${take}&skip=${skip}`,
    Method.GET,
  );
};
export const delete_admin = async (id: number) => {
  return await apiRequestRefeshToken(`/admin/${id}`, Method.DELETE);
};

export const register = async (employee: ICAdmin) => {
  return await apiRequestRefeshToken(
    `/admin/auth/register`,
    Method.POST,
    employee,
  );
};
