"use client";
import {
  faBars,
  faBell,
  faCartPlus,
  faCartShopping,
  faFile,
  faHeadphones,
  faHouse,
  faNewspaper,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { toSlug } from "@/redux/utils";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import {  useRouter } from "next/navigation";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { products } = useSelector((state: RootState) => state.products);
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const router = useRouter()
  //mở navbar reponsive
  const toggleResponsive = () => {
    setOpenMenu((prev) => !prev);
    setOpenUserMenu(false);
  };

  //open menu
  const handleOpenUserMenu = () => {
    setOpenMenu(false);
    setOpenUserMenu(!openUserMenu);
  };
  const handleOpenProductMenu = () => {
    setOpenProductMenu(!openProductMenu);
  };

  //logout
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-success text-white shadow overflow-hidden"
      style={{ zIndex: 1050 }}
    >
      {/* Phần header top */}
      <div className="d-flex justify-content-between px-4 py-1 justify-md-around align-items-center">
        {/* Left side */}
        <ul className="d-flex align-items-center gap-3 list-unstyled mb-0">
          <li className="fw-bold">
            <span className="d-md-block d-none">Kết nối</span>
          </li>
          <li>
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </li>
        </ul>

        {/* Right side */}
        <ul className="d-flex align-items-center gap-4 list-unstyled mb-0">
          <li>
            <a
              href="#"
              className="text-reset text-decoration-none d-flex gap-1 align-items-center"
            >
              <span className="d-md-block d-none">Thông báo</span>
              <FontAwesomeIcon icon={faBell} />
            </a>
          </li>
          <li>
            <a className="text-reset text-decoration-none d-flex gap-1 align-items-center">
              <span className="d-md-block d-none">Hỗ trợ</span>
              <FontAwesomeIcon icon={faHeadphones} />
            </a>
          </li>
          <li>
            <a
              onClick={handleOpenUserMenu}
              href="/trang-ca-nhan"
              className="text-reset text-decoration-none d-flex gap-1 align-items-center"
            >
              <span className="d-md-block d-none me-1">Tài khoản</span>{" "}
              <FontAwesomeIcon icon={faUser} />
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="btn text-reset text-decoration-none d-flex gap-1 align-items-center"
            >
              <span className="d-md-block d-none">Đăng xuất</span>
            </button>
          </li>
        </ul>
      </div>
      {/* logo/form/giỏ hàng/responsive button */}
      <div className="container pt-3 pb-md-0 pb-3 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="">
          <Image src="/logo.jpg" width={40} height={40} alt="logo" />
        </div>

        {/* Search */}
        <form className="d-flex" style={{ inlineSize: "50%" }}>
          <input
            type="text"
            className="form-control text-center bg-white rounded-0"
            placeholder="Tìm kiếm sản phẩm..."
            style={{ inlineSize: "90%" }}
          />
          <button className="btn rounded-0 btn-primary" onClick={(e)=>router.push(`#${e.target.name,e.target.value}`)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        {/* button */}
        <div className="d-flex gap-2">
          {loggedIn ? (
            <div className="d-flex gap-2">
              <Link href={"/"}>
                <button className="btn btn-outline-primary position-relative">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {/* Badge số lượng giỏ hàng (nếu có) */}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3{/* số lượng giỏ hàng */}
                  </span>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-primary"
              >
                <span className="d-block">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <Link
              href={"/dang-nhap"}
              className="bg-info py-1 px-2 text-decoration-none text-white text-center fw-bold rounded-0"
            >
              Sign in
            </Link>
          )}
          <div className="d-block d-md-none">
            <button
              className="btn btn-outline-primary position-relative"
              onClick={toggleResponsive}
            >
              <FontAwesomeIcon icon={faBars} />
              {/* nút mở menu khi ở mode mobile */}
            </button>
          </div>
        </div>
      </div>
      {/* navbar */}
      <nav
        className="d-md-flex bg-success px-4 py-2 d-flex d-none align-items-center justify-content-center productNavigation"
        style={{
          animation: "slideDown 0.3s ease forwards",
        }}
      >
        <ul className="list-unstyled d-flex gap-5 text-white mb-0">
          <li>
            <Link
              href="/"
              onClick={toggleResponsive}
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faHouse} /> Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href="/tuyen-dung"
              onClick={toggleResponsive}
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faFile} /> Tuyển dụng
            </Link>
          </li>
          <li className="position-relative">
            <a
              href="#"
              onClick={handleOpenProductMenu}
              className="text-white text-decoration-none pointer"
            >
              <FontAwesomeIcon icon={faCartPlus} /> Sản phẩm
            </a>
            {/*  */}
            {openProductMenu && (
              <ul className="">
                {Array.isArray(products) &&
                  products.map((item) => {
                    if (!item.metadescriptions) return null;
                    const url = toSlug(item.tieude as string);
                    return (
                      <li
                        key={item.id || Math.random()}
                        className="list-unstyled"
                      >
                        <Link
                          onClick={() => setOpenProductMenu(false)}
                          href={`/san-pham/${url}`}
                          className="text-decoration-none text-white"
                        >
                          {item.tieude}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/tin-tuc"
              onClick={toggleResponsive}
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faNewspaper} /> Tin tức
            </Link>
          </li>
        </ul>
      </nav>
      {/* Navigation menu - chỉ hiện khi openMenu = true */}
      {openMenu && (
        <nav
          className="bg-success mt-1 py-1 d-md-none"
          style={{
            animation: "slideDown 0.3s ease forwards",
          }}
        >
          <ul className="list-unstyled d-flex flex-column gap-3 text-white mb-0">
            <li>
              <ul className="mt-2 ps-3 text-white d-flex flex-column gap-3 list-unstyled">
                <li>
                  <Link
                    href="/"
                    onClick={toggleResponsive}
                    className="text-white text-decoration-none"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tuyen-dung"
                    onClick={toggleResponsive}
                    className="text-white text-decoration-none"
                  >
                    Tuyển dụng
                  </Link>
                </li>
                {Array.isArray(products) &&
                  products.map((item) => {
                    if (!item.metadescriptions) return null;
                    const url = toSlug(item.tieude as string);
                    return (
                      <li key={item.id || Math.random()}>
                        <Link
                          onClick={() => toggleResponsive()}
                          href={`/san-pham/${url}`}
                          className="text-decoration-none text-white"
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

      {/* Animation keyframes (optional, bạn có thể thêm vào CSS global) */}
      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
