import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';
import { ICategory, ICategoryUpdate } from '@/Types/Category';


export const get_all_category = async () => {
    return await apiRequestRefeshToken('/admin/category', Method.GET);
}

export const get_category_by_id = async (id:number) => {
    return await apiRequestRefeshToken(`/admin/category/${id}`, Method.GET);
}

export const create_category = async (name:string) => {
    return await apiRequestRefeshToken('/category', Method.POST, {name});
}

export const update_category = async (category:ICategoryUpdate) => {
    return await apiRequestRefeshToken(`/admin/category/`, Method.PUT, category);
}

export const delete_category = async (id:number) => {
    return await apiRequestRefeshToken(`/admin/category/${id}`, Method.DELETE);
}