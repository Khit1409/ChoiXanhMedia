import {
  faHouseChimney,
  faMobile,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AdminHeader() {
  return (
    <div className="d-flex justify-content-between align-items-center px-2">
      <div>
        <Link href={"/"} className="text-white text-decoration-none">
          <FontAwesomeIcon icon={faHouseChimney} className="pe-1"/>
          Về trang người dùng
        </Link>
      </div>
      <div className="text-white admin-header-navbar list-unstyled d-flex gap-2 align-items-center px-2">
        <button className="btn">
          <FontAwesomeIcon icon={faUsers} />
        </button>
        <button className="btn">
          <FontAwesomeIcon icon={faMobile} />
        </button>
        <Link href={"/"}>
          <Image
            src="https://choixanh.com.vn/dist/images/user.jpg"
            width={20}
            height={20}
            alt="user"
            className="w-auto h-auto rounded-circle"
          />
        </Link>
      </div>
    </div>
  );
}
