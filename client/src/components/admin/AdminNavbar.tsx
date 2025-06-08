import { RootState } from "@/redux/store";
import {
  faArrowAltCircleRight,
  faBook,
  faEarth,
  faHouseChimney,
  faLock,
  faNewspaper,
  faPaste,
  faQuestionCircle,
  faShirt,
  faShop,
  faStore,
  faTasks,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function AdminNavbar() {
  const { users } = useSelector((state: RootState) => state.auths);

  return (
    <div className="p-2 d-flex flex-column gap-2 align-items-center border-r-success admin-navbar">
      {/* logo */}
      <div className="d-flex gap-3 align-items-center">
        <Image
          src="https://choixanh.com.vn/dist/images/user.jpg"
          alt="logo"
          width={40}
          height={40}
          className="rounded-circle"
        />
        <div style={{ fontSize: "14px" }} className="d-flex flex-column">
          <strong>{users?.name}</strong>
          <Link href={"/"} className="text-decoration-none text-black">
            <FontAwesomeIcon icon={faNewspaper} className="pe-2" />
            log
          </Link>
        </div>
      </div>
      {/* form search */}
      <form action="">
        <input
          type="text"
          className="form-control rounded-0"
          style={{ blockSize: "30px", boxShadow: "none" }}
        />
      </form>
      {/* home  / logout */}
      <div>
        <ul className="d-flex gap-1 list-unstyled align-items-center">
          <li>
            <Link
              href="/admin"
              className="text-black text-decoration-none"
              style={{ fontSize: "14px" }}
            >
              <FontAwesomeIcon icon={faHouseChimney} className="pe-1" />
              Home
            </Link>
          </li>
          <li>
            <button className="btn">
              <FontAwesomeIcon icon={faArrowAltCircleRight} className="pe-1" />
              Logout
            </button>
          </li>
        </ul>
      </div>
      {/* menu 1 */}
      <div className="dropdown">
        <button
          className="btn btn-white fw-semibold dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faUsers} /> Tài khoản quản trị
        </button>
        <ul className="dropdown-menu shadow">
          <li>
            <Link className="dropdown-item" href="/">
              <FontAwesomeIcon icon={faLock} /> Thay đổi mật khẩu
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/">
              <FontAwesomeIcon icon={faUser} /> Thông tin tài khoản
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/">
              <FontAwesomeIcon icon={faPaste} /> Thông tin dịch vụ
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/">
              <FontAwesomeIcon icon={faQuestionCircle} /> Hộ trợ khách hàng
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/admin/add-new-admin">
              <FontAwesomeIcon icon={faUsers} /> Thêm quản trị viên
            </Link>
          </li>
        </ul>
      </div>
      {/* menu 2 */}
      <div className="dropdown">
        <button
          className="btn fw-semibold dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faTasks} /> Quản lý trang web
        </button>
        <ul className="shadow dropdown-menu">
          <li>
            <Link className="dropdown-item" href="/admin/add-new-page">
              <FontAwesomeIcon icon={faEarth} /> Thêm trang
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/admin/add-new-product">
              <FontAwesomeIcon icon={faShop} /> Thêm sản phẩm
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/admin/add-new-article">
              <FontAwesomeIcon icon={faBook} /> Thêm bài viết
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/admin/manager/order">
              <FontAwesomeIcon icon={faStore} /> Quản lý đơn hàng
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/admin/manager/product">
              <FontAwesomeIcon icon={faShirt} /> Quản lý toàn bộ sản phẩm
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
