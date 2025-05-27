"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/slices/authSlice";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ModelAlert from "../tools/ModelAlert";
// import { useRouter } from "next/navigation";

interface FormData {
  userid: string;
  pass: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({
    userid: "",
    pass: "",
  });
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
        setSuccess(true);
        setFormData({ userid: "", pass: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [success, setSuccess] = useState(false);
  return (
    <section className="d-flex align-items-center justify-content-center py-5">
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
              name="userid"
              value={formData.userid}
              onChange={handleOnchange}
              placeholder="Nhập email hoặc số điện thoại"
              className="form-control form-control-lg text-center rounded-pill"
            />
            <input
              type="password"
              name="pass"
              value={formData.pass}
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
                <Link href="/dang-ky" className="btn btn-success rounded-pill">
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
