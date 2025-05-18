import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterForm() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div className="flex items-center justify-center shadow-lg rounded-xl h-2/3 bg-white p-6 w-[80%]">
      {/* form */}
        <form
          action=""
          className="flex flex-col justify-around w-2/3 h-2/3 gap-3"
        >
          {/* họ và tên */}
          <div className="relative flex flex-col justify-center">
            <label htmlFor="" className="absolute ml-2">
              <FontAwesomeIcon icon={faUser} />
            </label>
            <input
              type="text"
              placeholder="Họ và tên"
              className="border rounded-full border-gray-500 outline-0 text-center w-full py-2"
            />
          </div>
          {/* email */}
          <div className="relative flex flex-col justify-center">
            <label htmlFor="" className="absolute ml-2">
              <FontAwesomeIcon icon={faEnvelope} />
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border rounded-full border-gray-500 outline-0 text-center w-full py-2"
            />
          </div>
          {/* số điện thoại */}
          <div className="relative flex flex-col justify-center">
            <label htmlFor="" className="absolute ml-2">
              <FontAwesomeIcon icon={faPhone} />
            </label>
            <input
              type="text"
              placeholder="Số điện thoại"
              className="border rounded-full border-gray-500 outline-0 text-center w-full py-2"
            />
          </div>
          {/* nick name */}
          <div className="relative flex flex-col justify-center">
            <label htmlFor="" className="absolute ml-2">
              <FontAwesomeIcon icon={faUserCircle} />
            </label>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="border rounded-full border-gray-500 outline-0 text-center w-full py-2"
            />
          </div>
          {/* mật khẩu */}
          <div className="relative flex flex-col justify-center">
            <label htmlFor="" className="absolute ml-2">
              <FontAwesomeIcon icon={faLock} />
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              className="border rounded-full border-gray-500 outline-0 text-center w-full py-2"
            />
          </div>
          {/* question */}
          <div className="relative flex justify-center gap-1">
            <input type="checkbox" className="border rounded" />
            Tôi đồng ý với{" "}
            <a className="text-cyan-500 underline" href="">
              Điều khoản sử dụng
            </a>
          </div>
          {/* submit */}
          <div className="flex items-center justify-center">
            <button className="bg-green-500 rounded-full w-1/2 text-white py-2 text-xl">
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
//
