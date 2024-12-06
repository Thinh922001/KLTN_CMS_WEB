import { ICoupon, ICouponCreate, ICouponUpdate } from '@/Types/Coupon';
import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';

export const get_all_coupon = async () => {
    return await apiRequestRefeshToken('/admin/coupon', Method.GET);
}

export const create_coupon = async (coupon:ICouponCreate) => {
    return await apiRequestRefeshToken('/admin/coupon', Method.POST, coupon);
}

export const update_coupon = async (id:number, coupon:ICouponUpdate) => {
    const {... data} = coupon
    return await apiRequestRefeshToken(`/admin/coupon/${id}`, Method.PATCH, data);
}


export const delete_coupon = async (id:number) => {
    return await apiRequestRefeshToken(`/admin/coupon/${id}`, Method.DELETE);
}