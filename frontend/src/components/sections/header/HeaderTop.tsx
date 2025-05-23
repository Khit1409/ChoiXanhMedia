import { logout } from "@/slices/authSlice";
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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userMenuList } from "@/redux/utils";

export default function HeaderTop() {
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  const dispatch = useDispatch<AppDispatch>();
  //dispatch open menu

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
        <li className="openUserModel">
          <button className="btn text-reset text-decoration-none d-flex gap-1 align-items-center ">
            <span className="d-md-block d-none me-1">Tài khoản</span>
            <FontAwesomeIcon icon={faUser} />
          </button>
          {/* dropdown user */}
          <ul className="dropdown-menu productMenu px-2 w-auto bg-success shadow-lg userModel border-0">
            {userMenuList.map((menu) => (
              <li className="list-unstyled p-1 w-100" key={menu.id}>
                <a
                  href={menu.url}
                  className="text-decoration-none d-block text-white"
                >
                  {menu.content}
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          {loggedIn ? (
            <div className="">
              <button
                onClick={handleLogout}
                className="btn text-white d-flex gap-1 align-items-center"
              >
                <span className="d-md-block d-none me-1">Logout</span>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </div>
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
