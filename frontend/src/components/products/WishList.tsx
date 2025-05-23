"use client";

import { DataProduct } from "@/types/productTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function WishList() {
  const [products, setProducts] = useState<DataProduct[]>([]);

  //xoá sản phẩm
  const removeWL = (idToRemove: string) => {
    const updatedWl = products.filter((item) => item.id !== idToRemove);
    setProducts(updatedWl);
    sessionStorage.setItem("wishList", JSON.stringify(updatedWl));
  };

  useEffect(() => {
    const savedwl = JSON.parse(sessionStorage.getItem("wishList") || "[]");
    if (savedwl) {
      setProducts(savedwl);
    }
  }, []);
  return (
    <div className="my-5">
      <h6 className="mb-4 fw-bold text-success border-bottom border-3 border-success">
        SẢN PHẨM YÊU THÍCH
      </h6>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
        {products && products.length > 0 ? (
          products.map((wl) => (
            <Link
              href={`san-pham/chi-tiet/${wl.id}`}
              className="col text-decoration-none"
              key={`product-${wl.id}-${Math.random()}`}
            >
              <div className="border h-100 bg-white d-flex flex-column justify-content-around text-decoration-none text-dark p-2">
                {wl.giakhuyenmai && wl.giakhuyenmai > 0 && (
                  <div className="mb-2">
                    <span className="p-1 text-bg-danger rounded">
                      {wl.giakhuyenmai}
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-center">
                  <Image
                    src={`https://choixanh.com.vn${wl.hinhdaidien}`}
                    alt={wl.tieude || ""}
                    width={100}
                    height={100}
                    className="img-fluid"
                  />
                </div>
                <div className="">
                  <p className="text-truncate">{wl.tieude}</p>
                  <p className="text-danger">&#8363; {Number(wl.gia)}</p>
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    onClick={() => removeWL(wl.id as string)}
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
            <p className="text-center">
              Chưa thêm sản phẩm nào vào danh sách yêu thích...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
