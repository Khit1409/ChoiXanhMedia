"use client";

import { register } from "@/redux/slices/auth.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faEnvelope,
  faHome,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface FormData {
  phone: string;
  avatar: string;
  roles: string;
  name: string;
  gender: string;
  email: string;
  password: string;
}

export default function AdminRegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<FormData>({
    email: "",
    roles: "admin",
    phone: "",
    password: "",
    avatar: "",
    name: "",
    gender: "",
  });

  const { resultCode, error } = useSelector((state: RootState) => state.auths);

  console.log(resultCode);
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        register({
          email: data.email,
          password: data.password,
          avatar: data.avatar,
          gender: data.gender,
          name: data.name,
          phone: data.phone,
          roles: data.roles,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex container align-items-center justify-content-center">
      <div className="bg-white shadow p-5 rounded w-100 mw-450">
        <h3 className="text-center mb-4">Đăng ký tài khoản Admin</h3>
        {resultCode != undefined ? (
          resultCode == 0 ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <p className="text-center text-success">Đăng ký thành công</p>
          )
        ) : (
          <></>
        )}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* Họ và tên */}
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnchange}
              placeholder="Họ và tên"
              className="form-control"
              required
            />
          </div>

          {/* Số điện thoại */}
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleOnchange}
              placeholder="Số điện thoại"
              className="form-control"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnchange}
              placeholder="Email"
              className="form-control"
              required
            />
          </div>

          {/* Giới tính */}
          <select
            name="gender"
            onChange={handleOnchange}
            value={data.gender}
            className="form-select"
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="unknow">Khác</option>
          </select>
          {/* Mật khẩu */}
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleOnchange}
              placeholder="Mật khẩu"
              className="form-control"
              required
              minLength={6}
            />
          </div>
          {/* Nút đăng ký */}
          <button
            type="submit"
            className="btn btn-success rounded-pill fw-semibold"
          >
            Đăng ký
          </button>
        </form>
        <div className="d-flex gap-2 my-4 justify-content-center align-items-center">
          <Link href={"/admin"} className="btn btn">
            <FontAwesomeIcon icon={faHome} className="mx-2" />
            Home
          </Link>
          <Link href={"/login"} className="btn btn">
            <FontAwesomeIcon icon={faUser} className="mx-2" />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
