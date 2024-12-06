import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import TableOne from '../../components/TableOne'
import useFetch from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { IPaging } from '@/Types/Pagging';
import { IAdmin } from '@/Types/Admin';
import { get_admin } from '@/api/admin';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Eye, Loader } from 'lucide-react';
import { toastMessage } from '@/utils/toastHelper';
import ModalBox from '@/components/ModalBox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const ListNhanVien = ():JSX.Element=>{
    const [stateApi, handleStateApi] = useFetch();
  const [stateApiAnorther, handleStateApiAnorther] = useFetch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [listKhachHang, setListKhachHang] = React.useState<IAdmin[]>([]);
  const [khachHang, setKhachHang] = React.useState<IAdmin>();
  const [take, setTake] = React.useState<number>(5);
  const [skip, setSkip] = React.useState<number>(0);
  const [paging, setPaging] = React.useState<IPaging>();
  const navigate = useNavigate();
    const handleOpenModal = (user: IAdmin) => {
        setKhachHang(user);
        setOpenModal(true);
        console.log(user);
        
    }
  React.useEffect(() => {
    handleStateApi(async () => {
      const res = await get_admin(take, skip);
      if (res.statusCode == 200) {
        setListKhachHang(res.data.data);
        setPaging(res.data.paging);
        return;
      } else if(res.statusCode == 401){
        toastMessage(`Bạn không có quyền truy cập vào đối tượng này, xin vui lòng liên hệ với quản trị để có thể truy cập: error ${res.message}`, 'error'); 
        setListKhachHang([]);
      }
    });
  }, [take,skip,stateApiAnorther.loading]);
  return (
    <>
      <Breadcrumb pageName="Danh sách nhân viên" />
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-2 ">
          <span className="font-bold">Lấy số lượng nhân viên</span>
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
              <TableHead>Tên nhân viên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Quyền truy cập</TableHead>
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
              listKhachHang?.map((item: IAdmin) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.roleName}</TableCell>
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
      <ModalBox
        isOpen={openModal}
        onClose={() => {
            setOpenModal(false)
            setKhachHang({
                email:"",
                id:0,
                name:"",
                roleName:""
            })
        }}
        className="w-[600px] h-max"
      >
        <div className="p-5 h-[500px] overflow-y-scroll">
          <h2 className="text-center font-bold py-2">Thông tin nhân viên</h2>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-2">
                <span className='font-bold'>Tên nhân viên</span>
                <Input type="text" value={khachHang?.name} onChange={(e) => setKhachHang({...khachHang,name:e.target.value})}/>
            </div>
            <div className="flex flex-col gap-2">
                <span className='font-bold'>Email</span>
                <Input type="text" value={khachHang?.email} onChange={(e) => setKhachHang({...khachHang,email:e.target.value})}/>
            </div>
            <div className="flex flex-col gap-2">
                <span className='font-bold'>Quyền truy cập</span>
                <Input type="text" value={khachHang?.roleName} onChange={(e) => setKhachHang({...khachHang,roleName:e.target.value})}/>
            </div>
            <div className='flex items-center justify-center'>
                <Button onClick={()=>{
                    setOpenModal(false)
                    setKhachHang({
                        email:"",
                        id:0,
                        name:"",
                        roleName:""
                    })
                }}>
                    {
                        stateApiAnorther.loading ? <Loader className='animate-spin text-white' /> : 'OK'
                    }
                </Button>
            </div>
          </div>
        </div>
      </ModalBox>
    </>
  );
}
export default ListNhanVien