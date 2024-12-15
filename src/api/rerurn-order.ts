import { Method } from '@/Types/Auth';
import { OrderReturnStatus } from '@/Types/order';
import { apiRequestRefeshToken } from '@/utils/apiHelperRefeshToken';

export const get_all_return_order = async (
  take: number = 5,
  skip: number = 0,
  status: string = 'Pending',
) => {
  return await apiRequestRefeshToken(
    `/return-order/admin?take=${take}&skip=${skip}&status=${status}`,
    Method.GET,
  );
};

export const change_status_return_order = async (
  id: number,
  status: OrderReturnStatus,
) => {
  return await apiRequestRefeshToken(`/return-order/admin`, Method.POST, {
    id,
    status,
  });
};
