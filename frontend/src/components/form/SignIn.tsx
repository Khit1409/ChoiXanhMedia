"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

interface FormData {
  userid: string;
  pass: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({
    userid: "",
    pass: "",
  });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.userid) {
        alert("Email hoặc số điện thoại rỗng");
        return;
      }
      if (!formData.pass) {
        alert("Mật khẩu rỗng");
        return;
      }

      const result = await dispatch(
        login({ userid: formData.userid, pass: formData.pass })
      );
      if (login.fulfilled.match(result)) {
        alert("Đăng nhập thành công");
        router.push("/");
        setFormData({ userid: "", pass: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="row shadow-lg bg-white rounded-4 p-4 w-100 mx-2 mx-md-0"
        style={{ maxInlineSize: "900px" }}
      >
        {/* Form Đăng nhập */}
        <div className="col-md-6 mb-4 mb-md-0">
          <form onSubmit={handleSignIn} className="d-flex flex-column gap-3">
            <h2 className="text-center text-primary fw-bold">Đăng nhập</h2>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              onChange={handleOnchange}
              placeholder="Nhập email hoặc số điện thoại"
              className="form-control form-control-lg rounded-pill"
            />
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleOnchange}
              placeholder="Nhập mật khẩu"
              className="form-control form-control-lg rounded-pill"
            />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-50 rounded-pill"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>

        {/* Đăng nhập MXH + Link */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center gap-3">
          <h5 className="fw-semibold text-secondary">
            Đăng nhập với mạng xã hội
          </h5>
          <div className="row w-100 gy-2">
            <div className="col-6">
              <button className="btn btn-info text-white w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                <FontAwesomeIcon icon={faLinkedin} />
                LinkedIn
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                <FontAwesomeIcon icon={faFacebook} />
                Facebook
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-secondary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                <FontAwesomeIcon icon={faTwitter} />
                Twitter
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-danger w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                <FontAwesomeIcon icon={faGoogle} />
                Google
              </button>
            </div>
          </div>
          <h5 className="fw-semibold text-secondary mt-3">
            Chưa có tài khoản?
          </h5>
          <div className="d-flex gap-3">
            <Link href="/dang-ki" className="btn btn-success rounded-pill">
              <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
            </Link>
            <Link href="/" className="btn btn-dark rounded-pill">
              <FontAwesomeIcon icon={faHouse} /> Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
