import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { INavbar } from './Sidebar';

interface Props {
  data: INavbar[];
}

const Menu: React.FC<Props> = ({ data }) => {
  const location = useLocation();

  return (
    <>
      {Array.isArray(data) &&
        data.map((subItem, index) => (
          <li key={index}>
            <NavLink
              to={subItem.href}
              className={() =>
                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                (location.pathname === subItem.href ? '!text-white' : '')
              }
            >
              {subItem.name}
            </NavLink>
          </li>
        ))}
    </>
  );
};

export default Menu;
