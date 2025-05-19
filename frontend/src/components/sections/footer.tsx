"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      { id: 3, icons: [{ id: 1, content: null }], content: "MST: 0314581926" },
      { id: 4, icons: [{ id: 1, content: faPhone }], content: "028 3974 3179" },
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
        content: "Chính sách hoạt động & hợp tác",
      },
    ],
  },
];

const menuList = [
  { id: 1, name: "Trang chủ", url: "/", icon: faHouse },
  { id: 2, name: "Cấu hình", url: "#", icon: faGear },
];

export default function Footer() {
  const { decoded } = useSelector((state: RootState) => state.auths);

  return (
    <div className="mt-3 bg-primary text-white py-4 d-flex flex-column align-items-center justify-content-center">
      {/* Navigation */}
      <nav className="mb-3">
        <ul className="nav justify-content-center">
          {menuList.map((menu) => (
            <li key={menu.id} className="nav-item">
              <Link href={menu.url} className="nav-link text-white">
                {menu.name}{" "}
                <FontAwesomeIcon icon={menu.icon} className="ms-1" />
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <span className="nav-link disabled text-white">|</span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-white">
              Chào mừng: {decoded?.users.userid || "Khách"}
            </span>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="bg-primary-second text-white w-75 p-4 rounded">
        <div className="row gy-3">
          <div className="col-12 col-md-3">
            <p>
              Chồi Xanh Media cung cấp các loại máy tính, laptop và thiết bị
              công nghệ chất lượng cao, đáp ứng mọi nhu cầu của doanh nghiệp và
              cá nhân.
            </p>
          </div>

          {footerList.map((group) => (
            <div key={group.id} className="col-6 col-md-3">
              {group.footer.map((ft) => (
                <a
                  href="#"
                  key={ft.id}
                  className="d-flex align-items-center text-white text-decoration-none mb-2"
                >
                  {ft.icons.map(
                    (iconObj) =>
                      iconObj.content && (
                        <FontAwesomeIcon
                          key={iconObj.id}
                          icon={iconObj.content}
                          className="me-2"
                        />
                      )
                  )}
                  {ft.content}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
