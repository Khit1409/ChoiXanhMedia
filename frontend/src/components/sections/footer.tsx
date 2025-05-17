"use client";

import React, { useState } from "react";
import UserBox from "./userbox";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  faBuilding,
  faDiagramProject,
  faLeaf,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { decoded } = useSelector((state: RootState) => state.auths);

  const handleOpenUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };
  const footerList = [
    {
      footerA: [
        {
          id: 1,
          icon: faBuilding,
          content: "Công ty TNHH Chồi Xanh Media",
        },
        {
          id: 2,
          icon: [{ id: 1, content: faBuilding }],
          content: "82A - 82B Dân Tộc, Q.Tân Phú",
        },
        {
          id: 3,
          icon: "",
          content: "MST: 0314581926",
        },
        {
          id: 4,
          icon: faPhone,
          content: "028 3974 3179",
        },
        {
          id: 5,
          icon: "",
          content: "info@choixanh.vn",
        },
      ],
      footerB: [
        {
          id: 1,
          icon: [{ id: 1, content: faDiagramProject }],
          content: "Theo dõi Chồi Xanh Media",
        },
        {
          id: 2,
          icon: [
            { id: 1, content: faFacebook },
            { id: 2, content: faYoutube },
            { id: 3, content: faTwitter },
            { id: 4, contetn: faInstagram },
          ],
          content: "",
        },
        {
          id: 3,
          icon: [faLeaf],
          content: "Vận hành bởi Chồi Xanh Media thành viên của Atoz.vn",
        },
      ],
    },
  ];

  const menuList = [
    { id: 1, name: "Trang chủ", url: "/", func: () => setOpenUserMenu(false) },
    { id: 2, name: "Cấu hình", url: "#", func: () => setOpenUserMenu(false) },
  ];
  return (
    <div className="mt-3  bg-green-600 py-6 md:flex flex-col hidden items-center justify-center gap-4">
      {openUserMenu && (
        <div className="absolute bottom-16 right-2 rounded bg-white border border-gray-300 p-4 animate-slide-up">
          <UserBox />
        </div>
      )}
      <nav className="flex items-center justify-center">
        <ul className="flex items-center gap-2">
          {menuList.map((menu) => (
            <li key={menu.id}>
              <Link href={menu.url}>{menu.name}</Link>
            </li>
          ))}
          <li>
            <Link href={"#"} onClick={() => handleOpenUserMenu}>
              Chào mừng: {decoded?.users.userid}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="bg-green-500 w-3/4 p-5 rounded place-items-center grid md:grid-cols-4 grid-cols-1">
        <p>
          Chồi Xanh Media cung cấp các loại máy tính, laptop và thiết bị công
          nghệ chất lượng cao, đáp ứng mọi nhu cầu của doanh nghiệp và cá nhân
        </p>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
