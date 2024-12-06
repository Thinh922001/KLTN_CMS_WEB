import { ICategory, ICategoryUpdate } from '@/Types/Category';
import { Eye, Loader, Paperclip, Plus, Save, Trash } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  delete_category,
  get_all_category,
  update_category,
  upload_category_img,
} from '../../api/category';
import Breadcrumb from '../../components/Breadcrumb';
import ModalBox from '../../components/ModalBox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import useFetch from '../../hooks/useFetch';
import { toastMessage } from '../../utils/toastHelper';
const ListLoaiSanPham = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [imageChange, setImage] = React.useState<File | null>(null);
  const navigate = useNavigate();
  const [listLoaiSanPham, setListLoaiSanPham] = React.useState<
    ICategory[] | null
  >(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleOpenModal = (cate: ICategory) => {
    setOpenModal(true);
    setCategory(cate);
  };

  const handleOpenModelDelete = (cate: ICategory) => {
    setOpenModalDelete(true);
    setCategory(cate);
  };

  const handleUpdateImg = () => {
    handleStateApiAnorther(async () => {
      if (!imageChange) return;
      if (!category) return;
      const res = await upload_category_img(category.id, imageChange);
      if (res.statusCode == 200) {
        setOpenModal(false);
        toastMessage(res.message, 'success');
        return;
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  const handleSubmitSave = () => {
    handleStateApiAnorther(async () => {
      if (!category) {
        return;
      }
      if (category.name.trim() === '') {
        toastMessage('Tên không được để trống', 'error');
        return;
      }
      const record: ICategoryUpdate = {
        cateId: category.id,
        name: category.name,
      };
      const [res] = await Promise.all([
        update_category(record),
        imageChange
          ? upload_category_img(category.id, imageChange)
          : Promise.resolve(),
      ]);

      if (res.statusCode == 200) {
        setOpenModal(false);
        toastMessage(res.message, 'success');
        return;
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };
  const handleDeleteCategory = () => {
    handleStateApiAnorther(async () => {
      if (!category) {
        return;
      }
      const res = await delete_category(category.id);
      if (res.statusCode == 200) {
        setOpenModalDelete(false);
        toastMessage('Xóa thành công', 'success');
        return;
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };
  React.useEffect(() => {
    handleStateApi(async () => {
      const res = await get_all_category();

      if (res.statusCode == 200) {
        setListLoaiSanPham(res.data);
        return;
      } else {
        setListLoaiSanPham(null);
        toastMessage(res.message, 'error');
      }
    });
  }, [stateApiAnorther.loading]);

  React.useEffect(() => {
    if (openModal) {
      setImage(null);
    }
  }, [openModal]);

  return (
    <>
      <Breadcrumb pageName="Danh sách loại sản phẩm" />
      <div className="py-3 px-2">
        <button
          className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-md"
          onClick={() => navigate('/loaisanpham/add')}
        >
          <Plus />
          <span>Thêm mới</span>
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"># ID</TableHead>
              <TableHead>Tên loại sản phẩm</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stateApi.loading ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center py-5 flex items-center justify-center"
                >
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : listLoaiSanPham === null ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-5 flex items-center justify-center"
                >
                  Không có gì ở đây
                </TableCell>
              </TableRow>
            ) : (
              listLoaiSanPham &&
              listLoaiSanPham.map((item: ICategory) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="font-medium">
                    <img
                      src={item.img || ''}
                      alt=""
                      className="w-16 h-16 rounded-sm object-cover"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleOpenModal(item)}
                      >
                        <Eye
                          className="text-sky-700"
                          style={{ color: 'blue' }}
                        />
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleOpenModelDelete(item)}
                      >
                        <Trash
                          className="text-red-600"
                          style={{ color: 'red' }}
                        />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ModalBox
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="w-[600px] h-max"
      >
        <div className="p-5">
          <h2 className="text-center font-bold">
            Thông tin chi tiết loại sản phẩm
          </h2>
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Tên loại sản phẩm</label>
              <input
                value={category?.name}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    name: e.target.value,
                    id: category?.id || 0,
                  })
                }
                type="text"
                className="px-2 py-1 border border-black rounded-md"
              />
            </div>
            <div className="flex items-center justify-center relative">
              <img
                className=" w-24 h-24 object-cover"
                src={
                  imageChange
                    ? `${URL.createObjectURL(imageChange)}`
                    : category?.img
                }
              />
              <div className="flex gap-2 items-center justify-center absolute bottom-0 left-[56%] ">
                <label className="flex gap-2 items-center cursor-pointer">
                  <span className="mt-2 text-base leading-normal">Sửa ảnh</span>
                  <Paperclip className="translate-y-1" />
                  <input
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-black  text-white flex items-center justify-center w-full px-2 py-2 my-3 rounded-md gap-2"
              onClick={handleSubmitSave}
            >
              {stateApiAnorther.loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin text-white" />
                </div>
              ) : (
                <>
                  <Save /> <span>Lưu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </ModalBox>
      <ModalBox
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        className="w-[400px] h-max"
      >
        <div className="p-5">
          <h2 className="text-center font-bold">
            Bạn có muốn xóa sản phẩm {category?.name} ?{' '}
          </h2>
          <div>
            <button
              style={{ backgroundColor: 'red' }}
              className="bg-red-500 text-white flex items-center justify-center w-full px-2 py-2 my-3 rounded-md gap-2"
              onClick={handleDeleteCategory}
            >
              {stateApiAnorther.loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin text-white" />
                </div>
              ) : (
                <>
                  <Trash /> <span>Xóa</span>
                </>
              )}
            </button>
          </div>
        </div>
      </ModalBox>
    </>
  );
};
export default ListLoaiSanPham;
