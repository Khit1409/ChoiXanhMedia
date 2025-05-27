"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataProduct } from "@/types/productTypes";

export default function WishList() {
  const [products, setProducts] = useState<DataProduct[]>([]);

  // Xoá sản phẩm khỏi wishlist
  const removeWL = (idToRemove: string) => {
    const updatedWl = products.filter((item) => item.id !== idToRemove);
    setProducts(updatedWl);
    sessionStorage.setItem("wishList", JSON.stringify(updatedWl));
  };

  // Load wishlist từ sessionStorage
  useEffect(() => {
    const savedWl = JSON.parse(sessionStorage.getItem("wishList") || "[]");
    if (savedWl) {
      setProducts(savedWl);
    }
  }, []);

  return (
    <div className="my-5">
      <h6 className="mb-4 fw-bold text-success border-bottom border-3 border-success">
        SẢN PHẨM YÊU THÍCH
      </h6>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
        {products.length > 0 ? (
          products.map((wl) => (
            <div className="col" key={wl.id}>
              <div className="border h-100 bg-white d-flex flex-column justify-content-around text-dark p-2">
                {/* Link chi tiết */}
                <Link
                  href={`/san-pham/chi-tiet/${wl.id}`}
                  className="text-decoration-none text-dark"
                >
                  {/* Giá khuyến mãi */}
                  {wl.giakhuyenmai && wl.giakhuyenmai > 0 && (
                    <div className="mb-2">
                      <span className="p-1 text-bg-danger rounded">
                        {wl.giakhuyenmai}
                      </span>
                    </div>
                  )}

                  {/* Ảnh sản phẩm */}
                  {wl.hinhdaidien && (
                    <div className="d-flex justify-content-center mb-2">
                      <Image
                        src={`https://choixanh.com.vn${wl.hinhdaidien}`}
                        alt={wl.tieude || ""}
                        width={100}
                        height={100}
                        className="img-fluid"
                      />
                    </div>
                  )}

                  {/* Tiêu đề và giá */}
                  <div>
                    <p className="text-truncate">{wl.tieude}</p>
                    <p className="text-danger">&#8363; {Number(wl.gia)}</p>
                  </div>
                </Link>

                {/* Nút hành động */}
                <div className="d-flex gap-2 justify-content-center mt-2">
                  <button
                    onClick={() => removeWL(wl.id as string)}
                    className="btn rounded-0 border-danger text-danger zoom-hover"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
            <p className="text-center text-muted">
              Chưa thêm sản phẩm nào vào danh sách yêu thích...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
