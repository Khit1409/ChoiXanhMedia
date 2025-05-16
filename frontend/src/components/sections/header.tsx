"use client";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toSlug } from "@/redux/utils";
import { getAllProduct } from "@/redux/slices/productSlice";
import UserBox from "./userbox";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  const { products } = useSelector((state: RootState) => state.products);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  //debug
  const { decoded } = useSelector((state: RootState) => state.auths);
  console.log(decoded);
  console.log(Array.isArray(decoded)); // true nếu là mảng

  //openMenu toggle
  const toggleResponsive = () => {
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const fetchProductMenu = async () => {
      await dispatch(getAllProduct());
    };
    fetchProductMenu();
  }, [dispatch]);

  //logout handle

  const handleOpenUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  return (
    <div className="sticky top-0 z-50 bg-green-500 text-white shadow-md">
      <div className=" mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo & Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleResponsive}
            className="p-2 border border-white rounded-lg transition duration-300 ease-in-out hover:text-cyan-400 hover:border-cyan-400"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>

        {/* Sign in / Logout */}
        {loggedIn ? (
          <div className="flex gap-2">
            <Link
              href={"/logout"}
              className="bg-white text-green-500 font-bold px-4 py-2 rounded-lg text-base hover:bg-gray-100"
            >
              Đăng xuất
            </Link>
            <button
              onClick={handleOpenUserMenu}
              className="bg-white text-green-500 font-bold px-4 py-2 rounded-lg text-base hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        ) : (
          <Link
            href={"/dang-nhap"}
            className="bg-white text-green-500 font-bold px-4 py-2 rounded-lg text-base hover:bg-gray-100"
          >
            Sign in
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      {openMenu && (
        <nav
          className={`bg-green-500 px-6 py-3 animate-slide-down ${
            openMenu ? "" : "hidden"
          }`}
        >
          <ul className="flex flex-col gap-4 text-lg font-bold list-none">
            <li>
              <Link href="/" onClick={toggleResponsive}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleResponsive}>
                Thông tin
              </Link>
            </li>
            <li>
              <Link href="/recruitment" onClick={toggleResponsive}>
                Tuyển dụng
              </Link>
            </li>
            <li>
              <span>Sản phẩm</span>
              <ul className="mt-2 pl-4 text-white flex flex-col gap-3">
                {Array.isArray(products) &&
                  products.map((item) => {
                    if (!item.metadescriptions) return null;
                    const url = toSlug(item.tieude as string);
                    return (
                      <li
                        key={item.id || Math.random()}
                        className="hover:border-b border-white"
                      >
                        <Link
                          href={`/san-pham/${url}`}
                          className="text-base before:content-['-'] before:mr-2"
                        >
                          {item.tieude}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
          </ul>
        </nav>
      )}
      {/* user box */}
      {openUserMenu && <UserBox />}
    </div>
  );
}
