import { ICategory, ICategoryUpdate, ICateType } from '@/Types/Category';
import { Eye, Loader, Paperclip, Plus, Save, Trash } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  delete_category,
  get_all_cate_type,
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
  const [stateApiAddCate, handleStateAddCate] = useFetch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [imageChange, setImage] = React.useState<File | null>(null);
  const [listCateType, setListCateType] = React.useState<ICateType[]>([]);
  const [cateTypeChoice, setCateTypeChoice] = React.useState<ICateType | null>(
    null,
  );
  const [cateTypeUpdate, setCateTypeUpdate] = React.useState<ICateType | null>(
    null,
  );
  const navigate = useNavigate();
  const [listLoaiSanPham, setListLoaiSanPham] = React.useState<
    ICategory[] | null
  >([]);
  const [reset, setReset] = React.useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleOpenModal = (cate: ICategory) => {
    setOpenModal(true);
    setCateTypeUpdate(cateTypeChoice);
    setCategory(cate);
  };

  const handleOpenModelDelete = (cate: ICategory) => {
    setOpenModalDelete(true);
    setCategory(cate);
  };

  const handleSubmitSave = () => {
    handleStateAddCate(async () => {
      if (!category) {
        return;
      }
      if (category.name.trim() === '') {
        toastMessage('Tên không được để trống', 'error');
        return;
      }
      let record: ICategoryUpdate = {
        cateId: category.id,
        name: category.name,
      };

      if (cateTypeUpdate) {
        record = {
          ...record,
          cateTypeId: cateTypeUpdate?.id,
        };
      }

      const [res] = await Promise.all([
        update_category(record),
        imageChange
          ? upload_category_img(category.id, imageChange)
          : Promise.resolve(),
      ]);

      if (res.statusCode == 200) {
        setOpenModal(false);

        setListLoaiSanPham(
          listLoaiSanPham?.map((e) =>
            e.id === record.cateId
              ? {
                  ...e,
                  name: record.name,
                  img: imageChange
                    ? e.img ?? URL.createObjectURL(imageChange)
                    : e.img,
                }
              : e,
          ) || [],
        );

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
    setReset(!reset);
  };

  React.useEffect(() => {
    handleStateApi(async () => {
      const resCateType = await get_all_cate_type();

      if (resCateType.statusCode == 200) {
        const res = await get_all_category(resCateType.data[0].id);
        setListCateType(resCateType.data);
        setCateTypeChoice(listCateType[0]);

        if (res.statusCode == 200) {
          setListLoaiSanPham(res.data);
        } else {
          toastMessage(res.message, 'error');
        }

        return;
      } else {
        setListLoaiSanPham(null);
        toastMessage(resCateType.message, 'error');
      }
    });
  }, [reset]);

  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        if (!cateTypeChoice) {
          return;
        }
        const resProduct = await get_all_category(cateTypeChoice.id);
        if (resProduct.statusCode === 200) {
          setListLoaiSanPham(resProduct.data);
        } else {
          toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
        }
      });
    };
    fetch();
  }, [cateTypeChoice]);

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
      <div className="flex items-center gap-5 py-5">
        <div className='flex flex-col gap-2 "'>
          <span className="font-bold">Loại danh mục</span>
          <select
            name=""
            id=""
            onChange={(e) =>
              setCateTypeChoice(listCateType[Number(e.target.value)])
            }
            className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
          >
            {listCateType.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
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
            <div className='flex flex-col gap-2 "'>
              <span className="font-bold">Loại danh mục</span>
              <select
                name=""
                id=""
                onChange={(e) =>
                  setCateTypeUpdate(listCateType[Number(e.target.value)])
                }
                className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
              >
                {listCateType.map((item, index) => (
                  <option
                    key={index}
                    value={index}
                    selected={item.id === cateTypeChoice?.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
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
              {stateApiAddCate.loading ? (
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
