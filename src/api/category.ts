import {
  ICategoryUpdate,
  ICateTypeCreate,
  ICateTypeUpdate,
} from '@/Types/Category';
import { toastMessage } from '@/utils/toastHelper';
import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';

export const get_all_category = async (cateTypeId?: number) => {
  const url = cateTypeId
    ? `/admin/category?cateTypeId=${cateTypeId}`
    : '/admin/category';
  return await apiRequestRefeshToken(url, Method.GET);
};

export const get_category_by_id = async (id: number) => {
  return await apiRequestRefeshToken(`/admin/category/${id}`, Method.GET);
};

export const create_category = async ({
  name,
  cateTypeId,
}: {
  name: string;
  cateTypeId: number;
}) => {
  return await apiRequestRefeshToken('/category', Method.POST, {
    name,
    cateTypeId,
  });
};

export const update_category = async (category: ICategoryUpdate) => {
  return await apiRequestRefeshToken(`/admin/category/`, Method.PUT, category);
};

export const delete_category = async (id: number) => {
  return await apiRequestRefeshToken(`/admin/category/${id}`, Method.DELETE);
};

export const get_all_cate_type = async () => {
  return await apiRequestRefeshToken(`/cate-type/admin`, Method.GET);
};

export const create_cate_type = async (cateType: ICateTypeCreate) => {
  return await apiRequestRefeshToken(`/cate-type`, Method.POST, cateType);
};

export const update_cate_type = async (cateType: ICateTypeUpdate) => {
  return await apiRequestRefeshToken(`/cate-type`, Method.PUT, cateType);
};

export const delete_cate_type = async (id: number) => {
  return await apiRequestRefeshToken(`/cate-type/${id}`, Method.DELETE);
};

export const upload_category_img = async (id: number, img: File) => {
  try {
    const formData = new FormData();
    formData.append('img', img);
    formData.append('cateId', id.toString());
    return await apiRequestRefeshToken(
      `/category/upload`,
      Method.POST,
      formData,
    );
  } catch (error) {
    console.error('Error:', error);
    toastMessage('Đã xảy ra lỗi upload img, vui lòng thử lại.', 'error');
  }
};
