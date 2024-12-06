import { get_all_user, update_user } from '@/api/user';
import Breadcrumb from '@/components/Breadcrumb';
import ModalBox from '@/components/ModalBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetch from '@/hooks/useFetch';
import { IKhachHang } from '@/Types/KhachHang';
import { IPaging } from '@/Types/Pagging';
import { toastMessage } from '@/utils/toastHelper';
import { ChevronLeft, ChevronRight, Eye, Loader } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const ListKhachHang = (): JSX.Element => {
  const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [listKhachHang, setListKhachHang] = React.useState<IKhachHang[]>([]);
  const [khachHang, setKhachHang] = React.useState<IKhachHang>();
  const [take, setTake] = React.useState<number>(5);
  const [skip, setSkip] = React.useState<number>(0);
  const [paging, setPaging] = React.useState<IPaging>();
  const navigate = useNavigate();
    const handleOpenModal = (user: IKhachHang) => {
        setKhachHang(user);
        setOpenModal(true);
        console.log(user);
        
    }
    const handleSave = () => {
        handleStateApiAnorther(async () => {
            const res = await update_user({
                id: khachHang?.id,
                address: khachHang?.address,
                gender: khachHang?.gender,
                name: khachHang?.name
            });
            if (res.statusCode == 200) {
                setKhachHang({name:"",
                address:"",gender:"",
                })
                setOpenModal(false);
                toastMessage("Chỉnh sửa thông tin thành công", 'success');
                return;
            } else {
                toastMessage(res.message, 'error');
            }
        })
    }
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
  }, [take,skip,stateApiAnorther.loading]);
  return (
    <>
      <Breadcrumb pageName="Danh sách khách hàng" />
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Lấy số lượng khách hàng</span>
          <select
            name=""
            id=""
            onChange={(e) => {setTake(Number(e.target.value));setSkip(0)}}
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
            ) : listKhachHang.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-5 flex items-center justify-center"
                >
                  Không có gì ở đây
                </TableCell>
              </TableRow>
            ) : (
              listKhachHang?.map((item: IKhachHang) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 items-center">
                      <span
                        className="cursor-pointer"
                        onClick={() => navigate(`/user/${item.id}`)}
                      >
                        <Eye
                          className="text-sky-700"
                          style={{ color: 'blue' }}
                        />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
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
export default ListKhachHang;
