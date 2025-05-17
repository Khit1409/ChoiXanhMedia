"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGear,
  faHeart,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UserBox from "./userbox";

// Định nghĩa kiểu dữ liệu cho mỗi item menu

export default function NavbarBottom() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handleOpenUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  // Danh sách menu
  const menuList = [
    {
      id: 1,
      icon: faHeart,
      url: "/wishtlist",
      ham: () => setOpenUserMenu(false),
    },
    {
      id: 2,
      icon: faCartShopping,
      url: "/gio-hang",
      ham: () => setOpenUserMenu(false),
    },
    { id: 3, icon: faHouse, url: "/", ham: () => setOpenUserMenu(false) },
    { id: 4, icon: faGear, url: "#", ham: () => setOpenUserMenu(false) },
    { id: 5, icon: faUser, url: "#", ham: handleOpenUserMenu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex border-t border-gray-300 justify-around bg-white shadow-lg w-full md:hidden">
      {/* UserBox overlay */}
      {openUserMenu && (
        <div className="absolute bottom-16 right-2 rounded bg-white border border-gray-300 p-4 animate-slide-up">
          <UserBox />
        </div>
      )}
      <ul className="flex items-center justify-around w-full py-4">
        {menuList.map((menu) => (
          <li key={menu.id}>
            <Link
              href={menu.url}
              className="text-xl text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={(e) => {
                // Nếu có handler thì không chuyển trang
                if (menu.ham) {
                  e.preventDefault();
                  menu.ham();
                }
              }}
            >
              <FontAwesomeIcon icon={menu.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
