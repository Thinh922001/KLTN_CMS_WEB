import { getValueFromLocalStorageObject } from '@/utils/local-storage';
import {
  ChartBarStacked,
  ChartColumnStacked,
  ChevronUpIcon,
  FileImage,
  Hexagon,
  LayoutGridIcon,
  Newspaper,
  TicketPercent,
  User2Icon,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Menu from './sub-menu';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
export interface INavbar {
  name: string;
  href: string;
  icon?: React.ReactNode;
  isChildren?: boolean;
  roles?: ('ADMIN' | 'SUPPER_ADMIN')[];
  childrens?: INavbar[];
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const roleName = getValueFromLocalStorageObject('admin', 'roleName');

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  const listNavbar: INavbar[] = [
    {
      name: 'Trang chủ',
      href: '/',
      isChildren: true,
      icon: <LayoutGridIcon />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [{ name: 'Thống kê', href: '/' }],
    },
    {
      name: 'Nhân viên',
      href: '/nhanvien',
      isChildren: true,
      icon: <User2Icon />,
      roles: ['SUPPER_ADMIN'],
      childrens: [
        { name: 'Danh sách', href: '/nhanvien' },
        { name: 'Thêm nhân viên', href: '/nhanvien/add' },
      ],
    },
    {
      name: 'Khách hàng',
      href: '/user',
      isChildren: true,
      icon: <User2Icon />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [{ name: 'Danh sách', href: '/user' }],
    },
    {
      name: 'Hóa đơn',
      href: '/hoadon',
      isChildren: true,
      icon: <Newspaper />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [{ name: 'Danh sách', href: '/hoadon' }],
    },
    {
      name: 'Khuyến mãi',
      href: '/magiamgia',
      isChildren: true,
      icon: <TicketPercent />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [
        { name: 'Danh sách', href: '/magiamgia' },
        { name: 'Thêm khuyến mãi', href: '/magiamgia/add' },
      ],
    },
    {
      name: 'Nhãn hàng',
      href: '/nhanhang',
      isChildren: true,
      icon: <Hexagon />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [
        { name: 'Danh sách', href: '/nhanhang' },
        { name: 'Thêm nhãn hàng', href: '/nhanhang/add' },
      ],
    },
    {
      name: 'Danh mục',
      href: '/loaisanpham',
      isChildren: true,
      icon: <ChartColumnStacked />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [
        { name: 'Danh sách danh mục', href: '/loaisanpham' },
        { name: 'Thêm danh mục', href: '/loaisanpham/add' },
        { name: 'Danh sách Loại danh mục', href: '/loaidanhuc' },
        { name: 'Thêm loại danh mục', href: '/loaidanhuc/add' },
      ],
    },
    {
      name: 'Sản phẩm',
      href: '/sanpham',
      isChildren: true,
      icon: <ChartBarStacked />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [
        { name: 'Danh sách', href: '/sanpham' },
        { name: 'Thêm sản phẩm', href: '/sanpham/add' },
      ],
    },
    {
      name: 'Hiển thị',
      href: '/banner',
      isChildren: true,
      icon: <FileImage />,
      roles: ['ADMIN', 'SUPPER_ADMIN'],
      childrens: [
        { name: 'Banner', href: '/banner' },
        { name: 'Banner danh mục', href: '/cate-banner' },
      ],
    },
  ];

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className={'block w-full'}>
          <span className="text-2xl font-bold text-white text-center block">
            Quản lý
          </span>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              THƯ MỤC
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {listNavbar.map((item, index) =>
                item.isChildren && item.roles?.includes(roleName) ? (
                  <SidebarLinkGroup
                    key={index}
                    activeCondition={pathname === item.href}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              pathname === item.href &&
                              'bg-graydark dark:bg-meta-4'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            {item.icon}
                            {item.name}
                            <ChevronUpIcon
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && 'rotate-180'
                              }`}
                            />
                          </NavLink>
                          {/* <!-- Dropdown Menu Start --> */}
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && 'hidden'
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              <Menu data={item.childrens || []} />
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : null,
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
