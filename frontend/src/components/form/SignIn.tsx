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
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex md:flex-row flex-col gap-10 shadow-2xl w-[90%] md:w-[70%] p-8 rounded-lg bg-white">
        {/* Form Đăng nhập */}
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-4 md:w-1/2 w-full justify-around "
        >
          <h1 className="text-2xl font-bold text-gray-700 text-center">
            Đăng nhập
          </h1>
          <input
            type="text"
            name="userid"
            placeholder="Nhập email hoặc số điện thoại"
            value={formData.userid}
            onChange={handleOnchange}
            className="border border-gray-300 rounded-full px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="pass"
            placeholder="Nhập mật khẩu"
            value={formData.pass}
            onChange={handleOnchange}
            className="border border-gray-300 rounded-full px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-full w-1/2 hover:bg-blue-700 transition"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        {/* Sign in với MXH + Link đăng ký */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center gap-5">
          <h2 className="text-center text-xl text-gray-600 font-semibold">
            Đăng nhập với mạng xã hội
          </h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            <button className="flex items-center justify-center gap-2 bg-cyan-600 text-white py-2 rounded-full font-semibold">
              <FontAwesomeIcon icon={faLinkedin} />
              LinkedIn
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-full font-semibold">
              <FontAwesomeIcon icon={faFacebook} />
              Facebook
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-400 text-white py-2 rounded-full font-semibold">
              <FontAwesomeIcon icon={faTwitter} />
              Twitter
            </button>
            <button className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-full font-semibold">
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </button>
          </div>
          <h2 className="text-center text-xl text-gray-600 font-semibold mt-4">
            Chưa có tài khoản?
          </h2>
          <div className="flex gap-4">
            <Link
              href="/dang-ki"
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
            </Link>
            <Link
              href="/"
              className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
            >
              <FontAwesomeIcon icon={faHouse} /> Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
