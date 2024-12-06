import { IKhachHang } from '@/Types/KhachHang';
import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';

export const get_all_user = async (take:number = 5, skip:number = 0) => {
    return await apiRequestRefeshToken(`/users?take=${take}&skip=${skip}`, Method.GET);
}


export const get_user_by_id = async (id:number) => {
    return await apiRequestRefeshToken(`/users/${id}`, Method.GET);
}

export const update_user = async ({id,address,gender,name}:IKhachHang) => {
    return await apiRequestRefeshToken(`/users/${id}`, Method.PUT, {name,address,gender});
}

export const restore_user = async (id:number) => {
    return await apiRequestRefeshToken(`/users/${id}`, Method.PATCH);
}