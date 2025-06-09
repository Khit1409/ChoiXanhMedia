import { logout } from "@/redux/slices/auth.slice";
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
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderTop() {
  const { loggedIn, user_category } = useSelector(
    (state: RootState) => state.auths
  );
  const dispatch = useDispatch<AppDispatch>();
  //dispatch open menu
  const { users } = useSelector((state: RootState) => state.auths);

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
        <li className="d-flex gap-2">
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
          {users?.roles === "admin" ? (
            <Link
              href={"/admin"}
              className="px-2 text-reset text-decoration-none d-flex gap-1 align-items-center "
            >
              <span className="d-md-block d-none me-1">Admin</span>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          ) : (
            <Link
              href={"#"}
              className="px-2 text-reset text-decoration-none d-flex gap-1 align-items-center "
            >
              <span className="d-md-block d-none me-1">Tài khoản</span>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
          {/* dropdown user */}
          {user_category?.length && (
            <ul className="dropdown-menu productMenu px-2 w-auto bg-success shadow-lg userModel border-0">
              {user_category?.map((menu) => (
                <li className="list-unstyled p-1 w-100" key={menu.id}>
                  <Link
                    href={menu.url}
                    className="text-decoration-none d-block text-white"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
            <Link
              href="/register"
              className="text-reset text-decoration-none d-flex gap-1 align-items-center"
            >
              <span className="d-md-block d-none me-1">Đăng ký</span>
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
