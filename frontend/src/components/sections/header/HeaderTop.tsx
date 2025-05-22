import { logout } from "@/redux/slices/authSlice";
import { handleOpenUserMenu } from "@/redux/slices/menuSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faAppStore,
  faFacebook,
  faGooglePlay,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightFromBracket,
  faBell,
  faHeadphones,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderTop() {
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  const dispatch = useDispatch<AppDispatch>();

  const [openUserMenu, setOpenUserMenu] = useState(false);

  //dispatch open menu
  const openMenu = () => {
    const newState = !openUserMenu;
    setOpenUserMenu(newState);
    dispatch(handleOpenUserMenu(newState));
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-between px-5">
      {/* Left side */}
      <ul className="d-flex align-items-center gap-3 list-unstyled mb-0">
        <li className="d-flex gap-2 align-items-center">
          <a className="d-md-block d-none text-decoration-none text-white">
            Tải ứng dụng
          </a>
          <div className="d-flex gap-3">
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faGooglePlay} />
            </a>
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faAppStore} />
            </a>
          </div>
        </li>
        <span>|</span>
        <li className="d-flex gap-2">
          <a className="d-md-block d-none text-decoration-none text-white">
            Kết nối
          </a>
          <div className="d-flex gap-3">
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-reset">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </li>
      </ul>

      {/* Right side */}
      <ul className="d-flex align-items-center gap-2 list-unstyled mb-0">
        <li>
          <button className="btn text-reset text-decoration-none d-flex gap-1 align-items-center">
            <span className="d-md-block d-none">Thông báo</span>
            <FontAwesomeIcon icon={faBell} />
          </button>
        </li>
        <li>
          <button className="btn text-reset text-decoration-none d-flex gap-1 align-items-center">
            <span className="d-md-block d-none">Hỗ trợ</span>
            <FontAwesomeIcon icon={faHeadphones} />
          </button>
        </li>
        <li>
          <button
            className="btn text-reset text-decoration-none d-flex gap-1 align-items-center"
            onClick={openMenu}
          >
            <span className="d-md-block d-none me-1">Tài khoản</span>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </li>
        <li>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="btn text-reset text-decoration-none d-flex gap-1 align-items-center"
            >
              <span className="d-md-block d-none me-1">Đăng xuất</span>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          ) : (
            <a
              href="/dang-ky"
              className="text-reset text-decoration-none d-flex gap-1 align-items-center"
            >
              <span className="d-md-block d-none me-1">Đăng ký</span>
              <FontAwesomeIcon icon={faUserPlus} />
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}
