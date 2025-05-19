"use client";

import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

interface FormData {
  id2: string;
  tel: string;
  userid: string;
  loaithanhvien: number;
  email: string;
  pass: string;
  tenkh: string;
}

export default function RegisterForm() {
  const [data, setData] = useState<FormData>({
    id2: "chophepdangky",
    userid: "",
    loaithanhvien: 0,
    tel: "",
    email: "",
    pass: "",
    tenkh: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/dang-ky", {
        id2: data.id2,
        userid: data.userid,
        loaithanhvien: data.loaithanhvien,
        tenkh: data.tenkh,
        tel: data.tel,
        email: data.email,
        pass: data.pass,
      });
      if (res.data.kq === "Login fail") {
        alert(res.data.kq);
      }
      if (res.data.kq === "Hệ thống không thể gửi mail!") {
        alert(res.data.kq);
      }
      if (
        res.data.kq ===
        "Tài khoản chưa kích hoạt, vui lòng làm theo hướng dẫn trong email"
      ) {
        alert("Vui lòng check mail của bạn!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="bg-white shadow p-4 rounded w-75 h-75 d-flex align-items-center justify-content-center">
        <form
          className="w-75 h-100 d-flex flex-column justify-content-around gap-3"
          onSubmit={handleSubmit}
        >
          {/* họ và tên */}
          <div className="position-relative mb-2">
            <label className="position-absolute top-50 start-0 translate-middle-y ms-2">
              <FontAwesomeIcon icon={faUser} />
            </label>
            <input
              type="text"
              name="tenkh"
              value={data.tenkh}
              onChange={handleOnchange}
              placeholder="Họ và tên"
              className="form-control ps-5 text-center rounded-pill"
            />
          </div>

          {/* email */}
          <div className="position-relative mb-2">
            <label className="position-absolute top-50 start-0 translate-middle-y ms-2">
              <FontAwesomeIcon icon={faEnvelope} />
            </label>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleOnchange}
              placeholder="Email"
              className="form-control ps-5 text-center rounded-pill"
            />
          </div>

          {/* số điện thoại */}
          <div className="position-relative mb-2">
            <label className="position-absolute top-50 start-0 translate-middle-y ms-2">
              <FontAwesomeIcon icon={faPhone} />
            </label>
            <input
              type="text"
              name="tel"
              value={data.tel}
              onChange={handleOnchange}
              placeholder="Số điện thoại"
              className="form-control ps-5 text-center rounded-pill"
            />
          </div>

          {/* tên đăng nhập */}
          <div className="position-relative mb-2">
            <label className="position-absolute top-50 start-0 translate-middle-y ms-2">
              <FontAwesomeIcon icon={faUserCircle} />
            </label>
            <input
              type="text"
              name="userid"
              value={data.userid}
              onChange={handleOnchange}
              placeholder="Tên đăng nhập"
              className="form-control ps-5 text-center rounded-pill"
            />
          </div>

          {/* mật khẩu */}
          <div className="position-relative mb-2">
            <label className="position-absolute top-50 start-0 translate-middle-y ms-2">
              <FontAwesomeIcon icon={faLock} />
            </label>
            <input
              type="password"
              name="pass"
              value={data.pass}
              onChange={handleOnchange}
              placeholder="Mật khẩu"
              className="form-control ps-5 text-center rounded-pill"
            />
          </div>

          {/* checkbox */}
          <div className="form-check d-flex justify-content-center align-items-center gap-2">
            <input type="checkbox" className="form-check-input" id="terms" />
            <label className="form-check-label" htmlFor="terms">
              Tôi đồng ý với{" "}
              <a href="#" className="text-primary text-decoration-underline">
                Điều khoản sử dụng
              </a>
            </label>
          </div>

          {/* submit */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success rounded-pill w-50 fs-5"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
