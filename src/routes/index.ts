import { lazy } from 'react';
const ECommerce = lazy(() => import('../pages/Dashboard/ECommerce'));

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Profile'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const ListNhanVien = lazy(() => import('../pages/NhanVien/ListNhanVien'));
const AddNhanVien = lazy(() => import('../pages/NhanVien/AddNhanVien'));
const ListSanPham = lazy(() => import('../pages/SanPham/ListSanPham'));
const AddSanPham = lazy(() => import('../pages/SanPham/AddSanPham'));
const ListNhanHang = lazy(() => import('../pages/NhanHang/ListNhanHang'));
const AddNhanHang = lazy(() => import('../pages/NhanHang/AddNhanHang'));
const ListLoaiSanPham = lazy(
  () => import('../pages/LoaiSanPham/ListLoaiSanPham'),
);
const AddLoaiSanPham = lazy(
  () => import('../pages/LoaiSanPham/AddLoaiSanPham'),
);
const ListHoaDon = lazy(() => import('../pages/HoaDon/ListHoaDon'));
const AddHoaDon = lazy(() => import('../pages/HoaDon/AddHoaDon'));
const ListMaGiamGia = lazy(() => import('../pages/MaGiamGia/ListMaGiamGia'));
const AddMaGiamGia = lazy(() => import('../pages/MaGiamGia/AddMaGiamGia'));
const ChiTietSanPham = lazy(() => import('../pages/SanPham/ChiTietSanPham'));
const ListChiTietSanPham = lazy(
  () => import('../pages/ChiTietSanPham/ListChiTietSanPham'),
);
const ListKhachHang = lazy(() => import('../pages/KhachHang/ListKhachHang'));
const KhachHangChiTiet = lazy(
  () => import('../pages/KhachHang/KhachHangChiTiet'),
);
const coreRoutes = [
  {
    path: '/',
    title: 'Dashboard',
    component: ECommerce,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/nhanvien',
    title: 'Nhân Viên',
    component: ListNhanVien,
  },
  {
    path: '/nhanvien/add',
    title: 'Nhân Viên',
    component: AddNhanVien,
  },
  {
    path: '/sanpham',
    title: 'Sản phẩm',
    component: ListSanPham,
  },
  {
    path: '/sanpham/add',
    title: 'Sản phẩm',
    component: AddSanPham,
  },
  {
    path: '/nhanhang',
    title: 'Nhân hàng',
    component: ListNhanHang,
  },
  {
    path: '/nhanhang/add',
    title: 'Nhân hàng',
    component: AddNhanHang,
  },
  {
    path: '/loaisanpham',
    title: 'Loại Sản phẩm',
    component: ListLoaiSanPham,
  },
  {
    path: '/loaisanpham/add',
    title: 'Loại Sản phẩm',
    component: AddLoaiSanPham,
  },
  {
    path: '/hoadon',
    title: 'Hóa Đơn',
    component: ListHoaDon,
  },
  {
    path: '/hoadon/add',
    title: 'Hóa Đơn',
    component: AddHoaDon,
  },
  {
    path: '/magiamgia',
    title: 'Má Giam Gia',
    component: ListMaGiamGia,
  },
  {
    path: '/magiamgia/add',
    title: 'Má Giam Gia',
    component: AddMaGiamGia,
  },
  {
    path: '/sanpham/:id/:brand_id/:cate_id',
    title: 'Chi Tiết Sản phẩm',
    component: ChiTietSanPham,
  },
  {
    path: '/chitietsanpham/:product_id',
    title: 'Chi Tiết Sản phẩm',
    component: ListChiTietSanPham,
  },
  {
    path: '/user',
    title: 'Khách Hàng',
    component: ListKhachHang,
  },
  {
    path: '/user/:id',
    title: 'Chi Tiết Khách Hàng',
    component: KhachHangChiTiet,
  },
];

const routes = [...coreRoutes];
export default routes;
