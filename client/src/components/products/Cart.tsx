"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

import { DataProduct } from "@/types/productTypes";
import { AppDispatch, RootState } from "@/redux/store";
import { handleOder } from "@/slices/productSlice";

import SpinAnimation from "../items/SpinAnimation";
import ModelAlert from "../tools/ModelAlert";

export default function Cart() {
  const [carts, setCarts] = useState<DataProduct[]>([]);
  const [oderLoading, setOderLoading] = useState(false);
  const [model, setModel] = useState<boolean>(false);

  const { users } = useSelector((state: RootState) => state.auths);
  const { oderResult } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch<AppDispatch>();

  // Lấy thông tin người dùng
  const userid = users?.userid;
  const pass = users?.pass;

  // Lấy dữ liệu giỏ hàng từ sessionStorage khi load component
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    if (savedCart) {
      setCarts(savedCart);
    }
  }, []);

  // Xoá sản phẩm khỏi giỏ hàng
  const removeCart = (idToRemove: string) => {
    const updatedCart = carts.filter((item) => item.id !== idToRemove);
    setCarts(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Mua hàng
  const oder = async () => {
    try {
      setOderLoading(true);
      await dispatch(
        handleOder({ userid: userid as string, pass: pass as string })
      );
      if (oderResult?.map((od) => od.maloi === "1")) {
        setOderLoading(false);
        setModel(true);
      } else {
        setOderLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-5">
      <h6 className="mb-4 fw-bold text-success border-bottom border-3 border-success">
        GIỎ HÀNG ĐƯỢC THÊM
      </h6>

      {model && <ModelAlert setModel={setModel} />}

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
        {carts && carts.length > 0 ? (
          carts.map((cart) => (
            <div
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

                <Link
                  href={`san-pham/chi-tiet/${cart.id}`}
                  className="d-flex justify-content-center"
                >
                  <Image
                    src={`https://choixanh.com.vn${cart.hinhdaidien}`}
                    alt={cart.tieude || ""}
                    width={100}
                    height={100}
                    className="img-fluid"
                  />
                </Link>

                <div className="py-1">
                  <p className="text-truncate">{cart.tieude}</p>
                  <p className="text-danger">&#8363; {Number(cart.gia)}</p>
                </div>

                <div className="py-1">
                  <input
                    type="number"
                    minLength={1}
                    className="form-control text-center"
                  />
                </div>

                <div className="d-flex gap-2 py-1 justify-content-center">
                  <button
                    onClick={() => removeCart(cart.id as string)}
                    className="btn rounded-0 border-danger text-danger zoom-hover"
                  >
                    Xoá
                  </button>

                  <button
                    onClick={oder}
                    className="btn rounded-0 bg-success text-white zoom-hover"
                  >
                    {oderLoading ? <SpinAnimation /> : "MUA NGAY"}
                  </button>
                </div>
              </div>
            </div>
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
