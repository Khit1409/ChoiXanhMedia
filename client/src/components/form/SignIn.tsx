"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { checkAuth, login } from "@/redux/slices/auth.slice";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ModelAlert from "../tools/ModelAlert";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.email) {
        alert("Email hoặc số điện thoại rỗng");
        return;
      }
      if (!formData.password) {
        alert("Mật khẩu rỗng");
        return;
      }
      const result = await dispatch(
        login({ email: formData.email, password: formData.password })
      );
      if (login.fulfilled.match(result)) {
        setSuccess(true);
        dispatch(checkAuth());
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [success, setSuccess] = useState(false);
  return (
    <section className="d-flex align-items-center justify-content-center py-5 min-vh-100">
      {/* Form Đăng nhập */}
      {success ? (
        <ModelAlert setModel={setSuccess} />
      ) : (
        <div className="border p-5 shadow">
          <form
            onSubmit={handleSignIn}
            className="d-flex flex-column gap-3 p-md-5 rounded "
          >
            <h2 className="text-center text-primary fw-bold">Đăng nhập</h2>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleOnchange}
              placeholder="Nhập email hoặc số điện thoại"
              className="form-control form-control-lg text-center rounded-pill"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
              placeholder="Nhập mật khẩu"
              className="form-control form-control-lg rounded-pill text-center"
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary rounded-pill">
                Đăng nhập
              </button>
            </div>
          </form>
          {/* Đăng nhập MXH + Link */}
          <div className="d-flex flex-column">
            <h5 className="fw-semibold text-secondary text-center">
              Đăng nhập với mạng xã hội
            </h5>
            <div className="d-flex flex-column gap-2 g-2">
              <div className="row row-cols-2 g-2">
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-info text-white w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                    <FontAwesomeIcon icon={faLinkedin} />
                    LinkedIn
                  </button>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                    <FontAwesomeIcon icon={faFacebook} />
                    Facebook
                  </button>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-secondary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                    <FontAwesomeIcon icon={faTwitter} />
                    Twitter
                  </button>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-danger w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                    <FontAwesomeIcon icon={faGoogle} />
                    Google
                  </button>
                </div>
              </div>
              <h5 className="fw-semibold text-secondary mt-3 text-center">
                Chưa có tài khoản?
              </h5>
              <div className="d-flex gap-3 justify-content-center">
                <Link href="/register" className="btn btn-success rounded-pill">
                  <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
                </Link>
                <Link href="/" className="btn btn-dark rounded-pill">
                  <FontAwesomeIcon icon={faHouse} /> Trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
