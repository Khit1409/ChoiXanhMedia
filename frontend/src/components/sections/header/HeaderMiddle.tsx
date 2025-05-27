"use client";

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
import { openResponsiveMenu } from "@/slices/menuSlice";

export default function HeaderMiddle() {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  const { responsiveMenu } = useSelector((state: RootState) => state.menus);

  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [wishQuantity, setWishQuantity] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    try {
      const savedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
      const savedWl = JSON.parse(sessionStorage.getItem("wishList") || "[]");

      setCartQuantity(savedCart.length);
      setWishQuantity(savedWl.length);
    } catch (error) {
      console.error("Error parsing cart or wishlist:", error);
    }
  }, []);

  return (
    <div>
      <div className="pt-3 pb-md-0 pb-3 d-flex justify-content-around align-items-center">
        {/* Logo */}
        <Link
          href="/"
          className="w-25 d-flex align-items-center justify-content-center"
        >
          <Image src="/logo.jpg" width={40} height={40} alt="logo" />
        </Link>

        {/* Search */}
        <form className="d-flex w-100 mx-2">
          <input
            type="text"
            className="form-control text-center bg-white rounded-0"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <a
            className="btn btn-primary rounded-0"
            href={`#${searchKeyword ? toSlug(searchKeyword) : ""}`}
          >
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </form>

        {/* Action buttons */}
        <div className="d-flex gap-2 w-25 justify-content-center align-items-center">
          {loggedIn ? (
            <div className="d-none d-md-flex gap-2">
              {/* Giỏ hàng */}
              <Link href="/gio-hang">
                <button className="btn btn-outline-primary position-relative">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {cartQuantity > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartQuantity}
                    </span>
                  )}
                </button>
              </Link>

              {/* Yêu thích */}
              <Link href="/wishlist">
                <button className="btn btn-outline-primary position-relative">
                  <FontAwesomeIcon icon={faHeart} />
                  {wishQuantity > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishQuantity}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          ) : (
            <Link
              href="/dang-nhap"
              className="d-none d-md-block bg-info py-1 px-2 text-white fw-bold text-decoration-none rounded-0 text-center"
            >
              Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <div className="d-md-none d-block">
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(openResponsiveMenu(!responsiveMenu))}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
