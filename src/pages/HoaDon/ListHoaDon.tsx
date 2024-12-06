import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/TableOne';
import { useNavigate } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { IKhachHang } from '@/Types/KhachHang';
import { IPaging } from '@/Types/Pagging';
import { get_all_user } from '@/api/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Eye, Loader } from 'lucide-react';
import ModalBox from '@/components/ModalBox';
import ItemHoaDonKhachHang from './ItemHoaDonKhachHang';
const ListHoaDon = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [listKhachHang, setListKhachHang] = React.useState<IKhachHang[]>([]);
  const [khachHang, setKhachHang] = React.useState<IKhachHang>();
  const [take, setTake] = React.useState<number>(5);
  const [skip, setSkip] = React.useState<number>(0);
  const [paging, setPaging] = React.useState<IPaging>();

  const navigate = useNavigate();
  React.useEffect(() => {
    handleStateApi(async () => {
      const res = await get_all_user(take, skip);
      if (res.statusCode == 200) {
        setListKhachHang(res.data.data);
        setPaging(res.data.paging);
        return;
      } else {
        setListKhachHang([]);
      }
    });
  }, [take, skip, stateApiAnorther.loading]);
  return (
    <>
      <Breadcrumb pageName="Danh sách hóa đơn" />
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Lấy số lượng khách hàng</span>
          <select
            name=""
            id=""
            onChange={(e) => {
              setTake(Number(e.target.value));
              setSkip(0);
            }}
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
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Giới tính</TableHead>
              <TableHead>Địa chỉ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stateApi.loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-5 flex items-center justify-center"
                >
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : listKhachHang.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-5 flex items-center justify-center"
                >
                  Không có gì ở đây
                </TableCell>
              </TableRow>
            ) : (
              listKhachHang?.map((item: IKhachHang, index: number) => (
                <ItemHoaDonKhachHang item={item} key={index} />
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end py-3 items-center gap-5">
          <span
            className={`w-10 h-10 border border-black rounded-full flex items-center justify-center cursor-pointer ${
              !paging?.isPrev ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => setSkip(skip - take)}
          >
            <ChevronLeft />
          </span>
          <span
            className={`w-10 h-10 border border-black rounded-full flex items-center justify-center cursor-pointer ${
              !paging?.isNext ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => setSkip(skip + take)}
          >
            <ChevronRight />
          </span>
        </div>
      </div>
    </>
  );
};
export default ListHoaDon;
