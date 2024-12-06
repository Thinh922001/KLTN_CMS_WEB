import { toastMessage } from '@/utils/toastHelper';
import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';
import { ICategory, ICategoryUpdate } from '@/Types/Category';

export const get_all_category = async () => {
  return await apiRequestRefeshToken('/admin/category', Method.GET);
};

export const get_category_by_id = async (id: number) => {
  return await apiRequestRefeshToken(`/admin/category/${id}`, Method.GET);
};

export const create_category = async (name: string) => {
  return await apiRequestRefeshToken('/category', Method.POST, { name });
};

export const update_category = async (category: ICategoryUpdate) => {
  return await apiRequestRefeshToken(`/admin/category/`, Method.PUT, category);
};

export const delete_category = async (id: number) => {
  return await apiRequestRefeshToken(`/admin/category/${id}`, Method.DELETE);
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
