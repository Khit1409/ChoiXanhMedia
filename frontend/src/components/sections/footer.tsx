"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  faBuilding,
  faDiagramProject,
  faEnvelope,
  faGear,
  faHouse,
  faLeaf,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  const { decoded } = useSelector((state: RootState) => state.auths);

  //footer list
  const footerList = [
    {
      id: 1,
      footer: [
        {
          id: 1,
          icons: [{ id: 1, content: faBuilding }],
          content: "Công ty TNHH Chồi Xanh Media",
        },
        {
          id: 2,
          icons: [{ id: 1, content: faBuilding }],
          content: "82A - 82B Dân Tộc, Q.Tân Phú",
        },
        {
          id: 3,
          icons: [{ id: 1, content: null }],
          content: "MST: 0314581926",
        },
        {
          id: 4,
          icons: [{ id: 1, content: faPhone }],
          content: "028 3974 3179",
        },
        {
          id: 5,
          icons: [{ id: 1, content: faEnvelope }],
          content: "info@choixanh.vn",
        },
      ],
    },
    {
      id: 2,
      footer: [
        {
          id: 1,
          icons: [{ id: 1, content: faDiagramProject }],
          content: "Theo dõi Chồi Xanh Media",
        },
        {
          id: 2,
          icons: [
            { id: 1, content: faFacebook },
            { id: 2, content: faYoutube },
            { id: 3, content: faTwitter },
            { id: 4, content: faInstagram },
            { id: 5, content: faLinkedin },
          ],
          content: "",
        },
        {
          id: 3,
          icons: [{ id: 1, content: faLeaf }],
          content: "Vận hành bởi Chồi Xanh Media thành viên của Atoz.vn",
        },
      ],
    },
    {
      id: 3,
      footer: [
        {
          id: 1,
          icons: [{ id: 1, content: null }],
          content: "Điều khoản sử dụng",
        },
        {
          id: 2,
          icons: [{ id: 1, content: null }],
          content: "Chính sách cookie",
        },
        {
          id: 3,
          icons: [{ id: 1, content: null }],
          content: "Chính sách dữ liệu",
        },
        {
          id: 4,
          icons: [{ id: 1, content: null }],
          content: "Chính sách hoạt đông & hợp tác",
        },
      ],
    },
  ];

  // navigation list
  const menuList = [
    { id: 1, name: "Trang chủ", url: "/", icon: faHouse },
    { id: 2, name: "Cấu hình", url: "#", icon: faGear },
  ];
  return (
    <div className="mt-3 bg-blue-600 text-white h-screen md:h-auto md:p-6 flex flex-col items-center justify-center gap-4">
      {/* footer navigation */}
      <nav className="flex items-center justify-center">
        <ul className="flex items-center gap-2 justify-center">
          {menuList.map((menu) => (
            <li key={menu.id} className="">
              <Link href={menu.url} className="hover:underline">
                {menu.name}
                <span>
                  <FontAwesomeIcon icon={menu.icon} className="ml-1" />
                </span>
              </Link>
            </li>
          ))}
          <li>
            <span>|</span>
          </li>
          <li className="">
            <Link href={""} className="hover:underline">
              Chào mừng: {decoded?.users.userid}
            </Link>
          </li>
        </ul>
      </nav>
      {/* footer content */}
      <div className="bg-blue-500 text-white w-3/4 p-6 rounded grid md:grid-cols-4 grid-cols-2 gap-5">
        <p>
          Chồi Xanh Media cung cấp các loại máy tính, laptop và thiết bị công
          nghệ chất lượng cao, đáp ứng mọi nhu cầu của doanh nghiệp và cá nhân
        </p>
        {footerList.map((footers) => (
          <div key={footers.id} className="flex flex-col gap-1">
            {footers.footer.map((ft) => (
              <a href="" key={ft.id} className="flex gap-1 hover:underline">
                {Array.isArray(ft.icons) &&
                  ft.icons.map((ic) => (
                    <span key={ic.id} className="flex gap-2">
                      {ic.content ? (
                        <FontAwesomeIcon icon={ic.content} />
                      ) : null}
                    </span>
                  ))}

                {ft.content}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
