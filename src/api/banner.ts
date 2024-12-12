import { Method } from '@/Types/Auth';
import { apiRequestRefeshToken } from '@/utils/apiHelperRefeshToken';

export const get_banner = async () => {
  return await apiRequestRefeshToken(`/banner/admin`, Method.GET);
};

export const uploadBanner = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('img', file);
  });
  return await apiRequestRefeshToken(`/banner`, Method.POST, formData);
};

export const deleteBanner = async (bannerId: number[]) => {
  return await apiRequestRefeshToken(`/banner`, Method.DELETE, { bannerId });
};

export const getBannerCate = async (cateId: number) => {
  return await apiRequestRefeshToken(
    `/banner-cate/admin/?cateId=${cateId}`,
    Method.GET,
  );
};

export const uploadBannerCate = async (cateId: number, files: File[]) => {
  const formData = new FormData();
  formData.append('cateId', cateId.toString());
  files.forEach((file) => {
    formData.append('img', file);
  });
  return await apiRequestRefeshToken(`/banner-cate`, Method.POST, formData);
};

export const delBannerCate = async (cateBannerId: number[]) => {
  return await apiRequestRefeshToken(`/banner-cate`, Method.DELETE, {
    cateBannerId,
  });
};
