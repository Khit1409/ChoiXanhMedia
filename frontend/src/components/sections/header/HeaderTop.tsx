import { logout } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faFacebook,
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

export default function HeaderTop() {
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  const dispatch = useDispatch<AppDispatch>();
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
        <li className="">
          <a className="d-md-block d-none text-decoration-none text-white">
            Tải ứng dụng
          </a>
        </li>
        <li className="d-flex gap-1">
          <span className="d-md-block d-none">Kết nối: </span>
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
            href="/trang-ca-nhan"
            className="text-reset text-decoration-none d-flex gap-1 align-items-center"
          >
            <span className="d-md-block d-none me-1">Tài khoản</span>{" "}
            <FontAwesomeIcon icon={faUser} />
          </a>
        </li>
        <li>
          {loggedIn ? (
            <a
              onClick={handleLogout}
              className="btn text-reset text-decoration-none d-flex gap-1 align-items-center"
            >
              <span className="d-md-block d-none me-1">Đăng xuất</span>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </a>
          ) : (
            <a
              href="/dang-ky"
              className="btn text-reset text-decoration-none d-flex gap-1 align-items-center"
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
