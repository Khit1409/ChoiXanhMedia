"use client";

import { logout } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function UserModel() {
  const { decoded } = useSelector((state: RootState) => state.auths);
  const { openMenu } = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!decoded) return null;

  return openMenu ? (
    <div className="">
      <ul className="py-2 list-unstyled m-0 border bg-light">
        {decoded.menu.map((item) => (
          <li key={`${item.id}-${Math.random()}`} className="mb-2">
            <a
              onClick={item.tenham === "Logout" ? handleLogout : () => null}
              href={item.url !== "dang-thoat" ? item.url : ""}
              className="d-block text-black rounded px-3 py-2 text-decoration-none"
              style={{ transition: "background-color 0.2s ease" }}
            >
              {item.tieude === "Đăng thoát" ? "Đăng xuất" : item.tieude}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
}
