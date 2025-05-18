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
      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm">Tài khoản</p>
        <p className="font-semibold text-lg text-blue-700">
          {decoded.users.userid}
        </p>
      </div>
      <ul className="space-y-2">
        {decoded.menu.map((item) => (
          <li key={item.id}>
            <a
              {...(item.tenham === "dang-thoat"
                ? { onClick: handleLogout }
                : { href: item.url })}
              className="block bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-800 rounded px-3 py-2"
            >
              {item.tieude}
            </a>
          </li>
        ))}
      </ul>
      4
    </div>
  );
}
