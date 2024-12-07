import { IProductDetailUpdate } from '@/Types/ProductDetail';
import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';

export const get_productDetail_by_id = async (id: number) => {
  return await apiRequestRefeshToken(`/admin/product-detail/${id}`, Method.GET);
};

export const upload_productDetail_image = async (
  productIdDetail: number,
  imgs: File[],
) => {
  const formData = new FormData();

  imgs.forEach((file) => {
    formData.append('img', file);
  });

  formData.append('productIdDetail', productIdDetail.toString());

  return await apiRequestRefeshToken(
    `/product-detail/upload`,
    Method.POST,
    formData,
  );
};

export const delete_productDetail_image = async ({
  delImgId,
  productDetailId,
}: {
  productDetailId: number;
  delImgId: string[];
}) => {
  return await apiRequestRefeshToken(`/product-detail/upload`, Method.DELETE, {
    delImgId,
    productDetailId,
  });
};

export const update_productDetail = async (
  productDetailId: number,
  productDetail: IProductDetailUpdate,
) => {
  return await apiRequestRefeshToken(
    `/product-detail/${productDetailId}`,
    Method.PUT,
    productDetail,
  );
};

export const delete_productDetail = async (productDetailId: number) => {
  return await apiRequestRefeshToken(
    `/product-detail/${productDetailId}`,
    Method.DELETE,
  );
};

export const restore_productDetail = async (productDetailId: number) => {
  return await apiRequestRefeshToken(
    `/product-detail/${productDetailId}`,
    Method.PATCH,
  );
};
