import { delete_coupon, get_all_coupon, update_coupon } from '@/api/coupon';
import ModalBox from '@/components/ModalBox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetch from '@/hooks/useFetch';
import { ICoupon, ICouponUpdate } from '@/Types/Coupon';
import { formatDate } from '@/utils/formatDate';
import { toastMessage } from '@/utils/toastHelper';
import { ChevronDown, Eye, Loader, Plus, Save, Trash } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
const ListMaGiamGia = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = React.useState<boolean>(false);
  const [coupon, setCoupon] = React.useState<ICoupon | null>(null);
  const [couponUpdate, setCouponUpdate] = React.useState<ICouponUpdate>({
    code: '',
    discount_value: 0,
    discount_type: 'percentage',
    is_active: true,
    usage_limit: 0,
    validityPeriodInDays: 0,
  });
  const navigate = useNavigate();
  const [listLoaiSanPham, setListLoaiSanPham] = React.useState<
    ICoupon[] | null
  >(null);

  const handleOpenModal = (cate: ICoupon) => {
    setOpenModal(true);
    setCoupon(cate);
    setCouponUpdate({
      code: cate.code,
      discount_value: cate.discount_value,
      discount_type: cate.discount_type,
      is_active: cate.is_active,
      usage_limit: cate.usage_limit,
      validityPeriodInDays: cate.expiration_date
        ? Math.ceil(
            (new Date(cate.expiration_date).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : 0,
    });
  };

  const handleOpenModelDelete = (cate: ICoupon) => {
    setOpenModalDelete(true);
    setCoupon(cate);
  };

  const handleDeleteCategory = () => {
    handleStateApiAnorther(async () => {
      if (!coupon) {
        return;
      }
      const res = await delete_coupon(coupon.id);
      if (res.statusCode == 200) {
        setOpenModalDelete(false);
        toastMessage('Xóa thành công', 'success');
        return;
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setCouponUpdate({
        ...couponUpdate,
        [name]: target.checked,
      });
    } else {
      const parsedValue = [
        'discount_value',
        'usage_limit',
        'validityPeriodInDays',
      ].includes(name)
        ? Number(value)
        : value;
      setCouponUpdate({
        ...couponUpdate,
        [name]: parsedValue,
      });
    }
  };

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    handleStateApi(async () => {
      if (!coupon) return;
      couponUpdate.discount_value = Number(couponUpdate.discount_value);
      const res = await update_coupon(coupon.id, couponUpdate);
      if (res.statusCode === 200) {
        toastMessage('Chỉnh sửa mã khuyến mãi thành công', 'success');
        setOpenModal(false);
      } else {
        toastMessage(res.message, 'error');
      }
    });
  };
  React.useEffect(() => {
    handleStateApi(async () => {
      const res = await get_all_coupon();

      if (res.statusCode == 200) {
        setListLoaiSanPham(res.data);
        return;
      } else {
        setListLoaiSanPham(null);
        toastMessage(res.message, 'error');
      }
    });
  }, [stateApiAnorther.loading]);
  return (
    <>
      <Breadcrumb pageName="Danh sách loại sản phẩm" />
      <div className="py-3 px-2">
        <button
          className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-md"
          onClick={() => navigate('/magiamgia/add')}
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
              <TableHead>CODE</TableHead>
              <TableHead>Loại giảm giá</TableHead>
              <TableHead>Giá trị</TableHead>
              <TableHead>Đã sử dụng</TableHead>
              <TableHead>Giới hạn sử dụng</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
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
              listLoaiSanPham.map((item: ICoupon) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.discount_type}</TableCell>
                  <TableCell>{item.discount_value}</TableCell>
                  <TableCell>{item.times_used}</TableCell>
                  <TableCell>{item.usage_limit}</TableCell>
                  <TableCell>{formatDate(item.expiration_date)}</TableCell>
                  <TableCell>
                    {item.is_active ? 'Đang có hiệu lực' : 'Không có hiệu lực'}
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
        <div className="p-5 h-[500px] overflow-y-scroll">
          <h2 className="text-center font-bold py-2">
            Thông tin chi tiết khuyến mãi
          </h2>
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full ">
                      <label className="mb-2.5 block text-black dark:text-white">
                        CODE
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={couponUpdate?.code}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Số ngày hiệu lực mã từ khi tạo khuyến mãi
                    </label>
                    <input
                      type="number"
                      name="validityPeriodInDays"
                      value={couponUpdate.validityPeriodInDays}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Số lượng tối đa áp dụng mã
                    </label>
                    <input
                      type="number"
                      name="usageLimit"
                      value={couponUpdate.usage_limit}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Loại khuyến mãi
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="discountType"
                        value={couponUpdate.discount_type}
                        onChange={handleChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="percentage">Phần trăm</option>
                        <option value="amount">Tiền</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <ChevronDown />
                      </span>
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Trạng thái
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="isActive"
                        value={String(couponUpdate.is_active)}
                        onChange={handleChange}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="true">Đang hiển thị</option>
                        <option value="false">Không hiển thị</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <ChevronDown />
                      </span>
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Giá trị
                    </label>
                    <input
                      type="number"
                      name="discount_value"
                      value={couponUpdate.discount_value}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-black  text-white flex items-center justify-center w-full px-2 py-2 my-3 rounded-md gap-2"
              onClick={handleSubmitUpdate}
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
            Bạn có muốn xóa mã {coupon?.code} ?{' '}
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
export default ListMaGiamGia;
