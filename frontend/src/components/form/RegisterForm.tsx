"use client";

import { register } from "@/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ModelAlert from "../tools/ModelAlert";

interface FormData {
  tel: string;
  userid: string;
  loaithanhvien: string;
  email: string;
  pass: string;
  tenkh: string;
}

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [data, setData] = useState<FormData>({
    userid: "",
    loaithanhvien: "0",
    tel: "",
    email: "",
    pass: "",
    tenkh: "",
  });

  const [submitAcc, setSubmitAcc] = useState(false);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        register({
          ...data,
          id2: agreeToTerms ? "chophepdangky" : "",
        })
      );

      if (register.fulfilled.match(res)) {
        setSubmitAcc(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // mã hoá mật khẩu để check
  //
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      {submitAcc ? (
        <ModelAlert setModel={setSubmitAcc} />
      ) : (
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
                type="email"
                name="userid"
                value={data.userid}
                onChange={handleOnchange}
                placeholder="Tên đăng nhập bắt buộc nhập email"
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
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <label className="form-check-label" htmlFor="terms">
                Tôi đồng ý với{" "}
                <a href="#" className="text-primary text-decoration-underline">
                  Điều khoản sử dụng
                </a>
              </label>
            </div>
            {/* nút đăng ký */}
            <div className="d-flex justify-content-center">
              <button
                disabled={!agreeToTerms}
                type="submit"
                className="btn btn-success rounded-pill w-50 fs-5"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
