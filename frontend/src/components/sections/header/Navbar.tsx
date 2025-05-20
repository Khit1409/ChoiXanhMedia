import { RootState } from "@/redux/store";
import { toSlug } from "@/redux/utils";
import {
  faCartPlus,
  faCartShopping,
  faFile,
  faHeart,
  faHouse,
  faLaugh,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type PropsType = {
  openMenu: boolean;
};

export default function Navbar({ openMenu}: PropsType) {
  const { loggedIn } = useSelector((state: RootState) => state.auths);

  const toggleResponsive = () => {
    setOpenProductMenu(false);
  };
  const [openProductMenu, setOpenProductMenu] = useState(false);

  const handleOpenProductMenu = () => {
    setOpenProductMenu(!openProductMenu);
  };
  const { products } = useSelector((state: RootState) => state.products);
  return (
    <>
      <nav
        className="d-md-flex bg-success px-4 py-2 d-flex d-none align-items-center justify-content-center"
        style={{
          animation: "slideDown 0.3s ease forwards",
        }}
      >
        <ul className="list-unstyled d-flex gap-5 text-white mb-0">
          <li>
            <Link
              href="/"
              onClick={toggleResponsive}
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faHouse} /> Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href="/tuyen-dung"
              onClick={toggleResponsive}
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faFile} /> Tuyển dụng
            </Link>
          </li>
          <li className="position-relative">
            <a
              onClick={handleOpenProductMenu}
              className=" text-white text-decoration-none pointer"
            >
              <FontAwesomeIcon icon={faCartPlus} /> Shop
            </a>
            {/*  */}
            {openProductMenu && (
              <ul className="">
                {Array.isArray(products) &&
                  products.map((item) => {
                    if (!item.metadescriptions) return null;
                    const url = toSlug(item.tieude as string);
                    return (
                      <li
                        key={item.id || Math.random()}
                        className="list-unstyled"
                      >
                        <Link
                          onClick={() => setOpenProductMenu(false)}
                          href={`/san-pham/${url}`}
                          className="text-decoration-none text-white"
                        >
                          {item.tieude}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/tin-tuc"
              onClick={toggleResponsive}
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faNewspaper} /> Tin tức
            </Link>
          </li>
          <li>
            <Link
              href="/giai-tri"
              onClick={toggleResponsive}
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faLaugh} /> Giải trí
            </Link>
          </li>
        </ul>
      </nav>
      {openMenu && (
        <nav
          className="bg-success py-1 d-md-none pb-3"
          style={{
            animation: "slideDown 0.3s ease forwards",
          }}
        >
          <ul className="list-unstyled d-flex flex-column gap-3 px-3 text-white mb-0">
            <li>
              <ul className="mt-2 text-white d-flex flex-column gap-3 list-unstyled">
                <li>
                  <Link
                    href="/"
                    onClick={toggleResponsive}
                    className="text-white text-decoration-none"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tuyen-dung"
                    onClick={toggleResponsive}
                    className="text-white text-decoration-none"
                  >
                    Tuyển dụng
                  </Link>
                </li>
                {Array.isArray(products) &&
                  products.map((item) => {
                    if (!item.metadescriptions) return null;
                    const url = toSlug(item.tieude as string);
                    return (
                      <li key={item.id || Math.random()}>
                        <Link
                          onClick={() => toggleResponsive()}
                          href={`/san-pham/${url}`}
                          className="text-decoration-none text-white"
                        >
                          {item.tieude}
                        </Link>
                      </li>
                    );
                  })}
                <li>
                  <Link
                    href="/tin-tuc"
                    onClick={toggleResponsive}
                    className="text-white text-decoration-none"
                  >
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    href="/giai-tri"
                    onClick={toggleResponsive}
                    className="text-white text-decoration-none"
                  >
                    Giải trí
                  </Link>
                </li>
                {loggedIn ? (
                  <li className="d-flex gap-3">
                    <Link href={"/gio-hang"}>
                      <button className="btn btn-outline-primary position-relative">
                        <FontAwesomeIcon icon={faCartShopping} />
                        {/* Badge số lượng giỏ hàng (nếu có) */}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          3{/* số lượng giỏ hàng */}
                        </span>
                      </button>
                    </Link>
                    <Link href={"/wishlist"}>
                      <button className="btn btn-outline-primary position-relative">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* Badge số lượng giỏ hàng (nếu có) */}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          3{/* số lượng giỏ hàng */}
                        </span>
                      </button>
                    </Link>
                  </li>
                ) : (
                  <Link
                    onClick={toggleResponsive}
                    href={"/dang-nhap"}
                    className="bg-info py-1 px-2 text-decoration-none text-white text-center fw-bold rounded"
                  >
                    Sign in
                  </Link>
                )}
              </ul>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
