"use client";

import { DataProduct } from "@/types/productTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [carts, setCarts] = useState<DataProduct[]>([]);

  //xoá sản phẩm
  const removeCart = (idToRemove: string) => {
    const updatedCart = carts.filter((item) => item.id !== idToRemove);
    setCarts(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    if (savedCart) {
      setCarts(savedCart);
    }
  }, []);
  return (
    <div className="my-5">
      <h6 className="mb-4 fw-bold text-success border-bottom border-3 border-success">
        GIỎ HÀNG ĐƯỢC THÊM
      </h6>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
        {carts && carts.length > 0 ? (
          carts.map((cart) => (
            <Link
              href={`san-pham/chi-tiet/${cart.id}`}
              className="col text-decoration-none"
              key={`product-${cart.id}`}
            >
              <div className="border h-100 bg-white d-flex flex-column justify-content-around text-decoration-none text-dark p-2">
                {cart.giakhuyenmai && cart.giakhuyenmai > 0 && (
                  <div className="mb-2">
                    <span className="p-1 text-bg-danger rounded">
                      {cart.giakhuyenmai}
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-center">
                  <Image
                    src={`https://choixanh.com.vn${cart.hinhdaidien}`}
                    alt={cart.tieude || ""}
                    width={100}
                    height={100}
                    className="img-fluid"
                  />
                </div>
                <div className="">
                  <p className="text-truncate">{cart.tieude}</p>
                  <p className="text-danger">&#8363; {Number(cart.gia)}</p>
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    onClick={() => removeCart(cart.id as string)}
                    className="btn rounded-0 border-danger text-danger zoom-hover"
                  >
                    Xoá
                  </button>
                  <button className="btn rounded-0 bg-success text-white zoom-hover">
                    MUA
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
            <p className="text-center">Chưa có giỏ hàng nào được thêm....</p>
          </div>
        )}
      </div>
    </div>
  );
}
