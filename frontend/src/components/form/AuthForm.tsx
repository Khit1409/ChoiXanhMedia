"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/slices/authSlice";

interface FormData {
  userid: string;
  pass: string;
}

export default function AuthForm() {
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
      if (formData.userid === "") {
        alert("Email hoặc số điện thoại rỗng");
      }
      if (formData.pass === "") {
        alert("Mật khẩu rỗng");
      }
      const result = await dispatch(
        login({ userid: formData.userid, pass: formData.pass })
      );
      if (login.fulfilled.match(result)) {
        setFormData({ userid: "", pass: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full max-w-[420px] p-5 bg-white rounded-lg shadow-md text-center flex flex-col">
      {/* form */}
      <div className="flex flex-col gap-8 w-full">
        <form
          onSubmit={handleSignIn}
          className="w-full flex flex-col gap-5 bg-gray-200/70 p-8 rounded-lg shadow-sm"
        >
          <h1 className="text-xl font-bold text-gray-600">Đăng nhập</h1>
          <input
            onChange={handleOnchange}
            type="text"
            name="userid"
            placeholder="Nhập email hoặc số điện thoại"
            className="w-full px-4 py-3 rounded-md border border-gray-300 text-center text-sm focus:outline-none focus:border-teal-500 focus:shadow-md"
          />
          <input
            type="password"
            onChange={handleOnchange}
            name="pass"
            placeholder="Nhập mật khẩu"
            className="w-full px-4 py-3 rounded-md border border-gray-300 text-center text-sm focus:outline-none focus:border-teal-500 focus:shadow-md"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-md transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        {/* social + register */}
        <div className="flex flex-col gap-5 bg-gray-200/70 p-8 rounded-lg shadow-sm">
          <h1 className="text-gray-600 text-lg font-semibold mb-2">
            Sign in with
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-medium transition-transform transform hover:scale-[1.03] bg-[#0e76a8]">
              <FontAwesomeIcon icon={faLinkedin} />
              Linkedin
            </button>
            <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-medium transition-transform transform hover:scale-[1.03] bg-[#3b5998]">
              <FontAwesomeIcon icon={faFacebook} />
              Facebook
            </button>
            <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-medium transition-transform transform hover:scale-[1.03] bg-[#1da1f2]">
              <FontAwesomeIcon icon={faTwitter} />
              Twitter
            </button>
            <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-medium transition-transform transform hover:scale-[1.03] bg-[#db4437]">
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </button>
          </div>

          <h1 className="text-gray-600 font-semibold">
            Đăng ký tài khoản thủ công
          </h1>
          <div className="flex items-center justify-center">
            <Link
              href="/dang-ki"
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faUserPlus} />
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
