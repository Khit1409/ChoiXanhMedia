import { openResponsiveMenu } from "@/slices/menuSlice";
import { getAllProduct } from "@/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [quanti, setQuanti] = useState<number>(0);
  const [quanti2, setQuanti2] = useState<number>(0);
  const { responsiveMenu } = useSelector((state: RootState) => state.menus);
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  //lấy số lượng giỏ hàng và wl khi mount
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const savedwl = JSON.parse(sessionStorage.getItem("wishList") || "[]");
    setQuanti2(savedwl.length);
    setQuanti(savedCart.length);
  }, [quanti, quanti2]);
  //gọi menu sản phẩm
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchProductsMenu = async () => {
      await dispatch(getAllProduct());
    };
    fetchProductsMenu();
  }, [dispatch]);

  //product in root state
  const { products } = useSelector((state: RootState) => state.products);
  return (
    <div>
      {/* desktop menu */}
      <nav
        className="d-md-flex bg-success px-4 pt-1 d-flex d-none align-items-center justify-content-center"
        style={{
          animation: "slideDown 0.3s ease forwards",
        }}
      >
        <ul className="list-unstyled d-flex gap-5 text-white mb-0">
          <li>
            <Link href="/" className="text-white text-decoration-none">
              <FontAwesomeIcon icon={faHouse} /> Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href="/tuyen-dung"
              className="text-white text-decoration-none"
            >
              <FontAwesomeIcon icon={faFile} /> Tuyển dụng
            </Link>
          </li>
          <li className="openProductMenu list-unstyled">
            <a
              className="text-white text-decoration-none cursor-pointer d-inline-block"
              role="button"
            >
              <FontAwesomeIcon icon={faCartPlus} /> Shop
            </a>
            {/* menu dropdown sản phẩm */}
            <ul className="dropdown-menu productMenu px-2 w-auto bg-success shadow-lg">
              {Array.isArray(products) &&
                products.map((item) => {
                  if (!item.metadescriptions) return null;
                  const url = toSlug(item.tieude as string);
                  return (
                    <li
                      key={item.id || Math.random()}
                      className="list-unstyled p-1 w-100"
                    >
                      <Link
                        href={`/san-pham/${url}`}
                        className="text-decoration-none d-block text-white"
                      >
                        {item.tieude}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </li>

          <li className="openNewsMenu list-unstyled">
            <a className="text-white text-decoration-none cursor-pointer d-inline-block">
              <FontAwesomeIcon icon={faNewspaper} /> Tin tức
            </a>
            {/* menu dropdown tin tức */}
            <ul className="newsMenu dropdown-menu list-unstyled position-absolute px-2 top-1 right-10 w-auto z-3 bg-success">
              <li>
                <Link
                  className="text-decoration-none text-white d-block py-1 "
                  href={"/tin-tuc/nhip-song-so"}
                >
                  Nhịp sống số
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-white d-block py-1"
                  href={"/tin-tuc/tin-cong-nghe"}
                >
                  Công nghệ
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/giai-tri" className="text-white text-decoration-none">
              <FontAwesomeIcon icon={faLaugh} /> Giải trí
            </Link>
          </li>
        </ul>
      </nav>
      {/* mobile menu */}
      {responsiveMenu && (
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
                    className="text-white text-decoration-none"
                    onClick={() => dispatch(openResponsiveMenu(false))}
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => dispatch(openResponsiveMenu(false))}
                    href="/tuyen-dung"
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
                          onClick={() => dispatch(openResponsiveMenu(false))}
                          href={`/san-pham/${url}`}
                          className="text-decoration-none text-white dropdown-item"
                        >
                          {item.tieude}
                        </Link>
                      </li>
                    );
                  })}
                <li>
                  <a
                    className="text-white text-decoration-none"
                    href="/tin-tuc"
                  >
                    Tin tức
                  </a>
                  <ul className="list-unstyled">
                    <li className="px-3 pt-2">
                      <Link
                        onClick={() => dispatch(openResponsiveMenu(false))}
                        className="text-decoration-none text-white "
                        href={"/tin-tuc/nhip-song-so"}
                      >
                        Nhịp sống số
                      </Link>
                    </li>
                    <li className="px-3 pt-2">
                      <Link
                        onClick={() => dispatch(openResponsiveMenu(false))}
                        className="text-decoration-none dropdown-item text-white"
                        href={"/tin-tuc/tin-cong-nghe"}
                      >
                        Công nghệ
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    onClick={() => dispatch(openResponsiveMenu(false))}
                    href="/giai-tri"
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
                          {quanti}
                          {/* số lượng giỏ hàng */}
                        </span>
                      </button>
                    </Link>
                    <Link href={"/wishlist"}>
                      <button className="btn btn-outline-primary position-relative">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* Badge số lượng giỏ hàng (nếu có) */}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {/* số lượng wl*/}
                          {quanti2}
                        </span>
                      </button>
                    </Link>
                  </li>
                ) : (
                  <Link
                    href={"/dang-nhap"}
                    onClick={() => dispatch(openResponsiveMenu(false))}
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
    </div>
  );
}
