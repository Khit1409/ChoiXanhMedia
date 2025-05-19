import { logout } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserBox() {
  const { decoded } = useSelector((state: RootState) => state.auths);
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

  return (
    <div>
      <ul className="py-2 list-unstyled m-0">
        {decoded.menu.map((item) => (
          <li key={item.id} className="mb-2">
            <a
              {...(item.tenham === "dang-thoat"
                ? { onClick: handleLogout, role: "button" }
                : { href: item.url })}
              className="d-block text-black rounded px-3 py-2 text-decoration-none"
              style={{ transition: "background-color 0.2s ease" }}
            >
              {item.tieude === "Đăng thoát" ? "Đăng xuất" : item.tieude}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
