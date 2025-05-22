import { AppDispatch, RootState } from "@/redux/store";
import { toSlug } from "@/redux/utils";
import {
  faBars,
  faCartShopping,
  faHeart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { openResponsiveMenu } from "@/redux/slices/menuSlice";

export default function HeaderMiddle() {
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  const [quanti, setQuanti] = useState<number>(0);
  const [quanti2, setQuanti2] = useState<number>(0);
  const [url, setUrl] = useState<string>();
  const { responsiveMenu } = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch<AppDispatch>();
  //lấy số lượng giỏ hàng
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const savedwl = JSON.parse(sessionStorage.getItem("wishlist") || "[]");
    setQuanti2(savedwl.length);
    setQuanti(savedCart.length);
  }, []);

  return (
    <>
      <div className="pt-3 pb-md-0 pb-3 d-flex justify-content-around align-items-center">
        {/* Logo */}
        <div className="w-25 d-flex align-items-center justify-content-center">
          <Image src="/logo.jpg" width={40} height={40} alt="logo" />
        </div>

        {/* Search */}
        <form className="d-flex" style={{ inlineSize: "100%" }}>
          <input
            type="text"
            className="form-control text-center bg-white rounded-0 w-100"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <a
            className="btn rounded-0 btn-primary"
            href={`#${url ? toSlug(url as string) : ""}`}
          >
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </form>

        {/* button */}
        <div className="d-flex gap-2 w-25 justify-content-center">
          {loggedIn ? (
            <div className="gap-3 d-md-flex d-none">
              <Link href={"/gio-hang"}>
                <button className="btn btn-outline-primary position-relative">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {/* Badge số lượng giỏ hàng (nếu có) */}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {quanti} {/* số lượng giỏ hàng */}
                  </span>
                </button>
              </Link>
              <Link href={"/wishlist"}>
                <button className="btn btn-outline-primary position-relative">
                  <FontAwesomeIcon icon={faHeart} />
                  {/* Badge số lượng giỏ hàng (nếu có) */}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {quanti2}
                    {/* số lượng wishlist */}
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            <Link
              href={"/dang-nhap"}
              className="bg-info d-md-block d-none py-1 px-2 text-decoration-none text-white text-center fw-bold rounded-0"
            >
              Sign in
            </Link>
          )}
          <div className="d-block d-md-none">
            <button
              className="btn btn-outline-primary position-relative"
              onClick={() => dispatch(openResponsiveMenu(!responsiveMenu))}
            >
              <FontAwesomeIcon icon={faBars} />
              {/* nút mở menu khi ở mode mobile */}
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
