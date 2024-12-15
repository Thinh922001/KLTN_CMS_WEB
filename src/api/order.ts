import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';

export const get_all_order = async (
  take: number = 5,
  skip: number = 0,
  status: string = 'Pending',
) => {
  return await apiRequestRefeshToken(
    `/admin/order?take=${take}&skip=${skip}&status=${status}`,
    Method.GET,
  );
};

export const get_all_order_by_user = async (userId: number) => {
  return await apiRequestRefeshToken(`/admin/order/user/${userId}`, Method.GET);
};

export const get_all_order_detail_by_order = async (orderId: number) => {
  return await apiRequestRefeshToken(
    `/admin/order-detail?orderId=${orderId}`,
    Method.GET,
  );
};

export const update_order_status = async (orderId: number, status: string) => {
  return await apiRequestRefeshToken(`/admin/order/status`, Method.PUT, {
    orderId,
    status,
  });
};

export const get_all_order_new = async (
  take: number = 50,
  skip: number = 0,
  status: string = '',
) => {
  return await apiRequestRefeshToken(
    `/admin/order/all?take=${take}&skip=${skip}&filterBy=${status}`,
    Method.GET,
  );
};
