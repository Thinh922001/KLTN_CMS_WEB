import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/TableOne';
import { useNavigate } from 'react-router-dom';
import { Eye, Loader, Plus, RefreshCcw, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetch from '@/hooks/useFetch';
import { get_all_category } from '@/api/category';
import { get_all_brand } from '@/api/brand';
import { ICategory } from '@/Types/Category';
import { IBrand } from '@/Types/Brand';
import { toastMessage } from '@/utils/toastHelper';
import { IProduct } from '@/Types/Product';
import { delete_product, get_all_product, restore_product } from '@/api/product';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
const ListSanPham = (): JSX.Element => {
  const navigate = useNavigate();
  const [stateApi, handleStateApi] = useFetch();
  const [cateChoice, setCateChoice] = React.useState<ICategory>();
  const [brandChoice, setBrandChoice] = React.useState<IBrand>();
  const [cate, setCate] = React.useState<ICategory[]>([]);
  const [brand, setBrand] = React.useState<IBrand[]>([]);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [take, setTake] = React.useState<number>(5);
  const [reset, setReset] = React.useState<boolean>(false);
  const handleDeleteProduct = (id: number) => {
    handleStateApi(async () => {
      const res = await delete_product(id);
      if (res.statusCode === 200) {
        toastMessage('Xoa san pham thanh cong', 'success');
      }
      setReset(!reset);
    });
  };
  const handleRestoreProduct = (id: number) => {
    handleStateApi(async () => {
      const res = await restore_product(id);
      if (res.statusCode === 200) {
        toastMessage('Khôi phục sản phẩm thành công', 'success');
      }
      setReset(!reset);
    });
  }
  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        const res = await get_all_category();
        const resBrand = await get_all_brand();
        if (res.statusCode === 200 && resBrand.statusCode === 200) {
          setCate(res.data);
          setBrand(resBrand.data);
          setBrandChoice(resBrand.data[0]);
          setCateChoice(res.data[0]);
          const resProduct = await get_all_product(
            take,
            0,
            res.data[0].id,
            resBrand.data[0].id,
          );
          if (resProduct.statusCode === 200) {
            setProducts(resProduct.data.data);
          } else {
            toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
          }
        } else {
          toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
        }
      });
    };
    fetch();
  }, [reset]);

  React.useEffect(() => {
    const fetch = () => {
      handleStateApi(async () => {
        if (!brandChoice || !cateChoice) {
          //   toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
          return;
        }
        const resProduct = await get_all_product(
          take,
          0,
          brandChoice.id,
          cateChoice.id,
        );
        if (resProduct.statusCode === 200) {
          setProducts(resProduct.data.data);
        } else {
          toastMessage('Đã có lỗi khi tải dữ liệu', 'error');
        }
      });
    };
    fetch();
  }, [take, cateChoice, brandChoice]);
  return (
    <>
      <Breadcrumb pageName="Danh sách sản phẩm" />
      <div className="py-3 px-2">
        <button
          className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-md"
          onClick={() => navigate('/sanpham/add')}
        >
          <Plus />
          <span>Thêm mới</span>
        </button>
      </div>
      <div className="flex items-center gap-5 py-5">
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Loại sản phẩm</span>
          <select
            name=""
            id=""
            onChange={(e) => setCateChoice(cate[Number(e.target.value)])}
            className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
          >
            {cate.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Hãng</span>
          <select
            name=""
            id=""
            onChange={(e) => setBrandChoice(brand[Number(e.target.value)])}
            className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
          >
            {brand.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Lấy số lượng sản phẩm</span>
          <select
            name=""
            id=""
            onChange={(e) => setTake(Number(e.target.value))}
            className="p-2 rounded-md border border-stroke dark:border-strokedark border-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
            <option value={45}>45</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"># ID</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Tên loại sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Giá cũ</TableHead>
              <TableHead>Giảm giá phần trăm</TableHead>
              <TableHead>Thẻ gắn</TableHead>
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
            ) : products === null ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-5 flex items-center justify-center"
                >
                  Không có gì ở đây
                </TableCell>
              </TableRow>
            ) : (
              products &&
              products.map((item: IProduct) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <img
                      src={item.img}
                      alt=""
                      className="w-16 h-16 rounded-sm object-cover"
                    />
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.oldPrice}</TableCell>
                  <TableCell>{item.discountPercent} %</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap items-center h-full">
                      {item?.tabs?.map((tab, index) => (
                        <span
                          key={index}
                          className="text-sm px-2 py-1 rounded-full bg-black text-white"
                        >
                          {tab}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span
                              className={` ${
                                item.deletedAt !== null
                                  ? 'pointer-events-none hidden'
                                  : 'cursor-pointer'
                              }`}
                              onClick={() =>
                                navigate(
                                  `/sanpham/${item.id}/${brandChoice?.id}/${cateChoice?.id}`,
                                )
                              }
                            >
                              <Eye
                                className="text-sky-700"
                                style={{ color: 'blue' }}
                              />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p> Xem thêm</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {item.deletedAt !== null ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                className="cursor-pointer"
                                onClick={() =>
                                  handleRestoreProduct(item.id || 0)
                                }
                              >
                                <RefreshCcw className="text-purple-500" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p> Khôi phục sản phẩm</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                className="cursor-pointer"
                                onClick={() =>
                                  handleDeleteProduct(item.id || 0)
                                }
                              >
                                <Trash className="text-red-600" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p> Xóa sản phẩm</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default ListSanPham;
