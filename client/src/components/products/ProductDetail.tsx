"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";

import ModelAlert from "../tools/ModelAlert";
import ProductContainer from "./ProductContainer";
import SpinAnimation from "../items/SpinAnimation";
import { getProductDetail } from "@/redux/slices/page.content.slice";

export default function ProductDetail() {
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { productDetail } = useSelector((state: RootState) => state.products);

  const [expanded, setExpanded] = useState(false);

  const [model, setModel] = useState<boolean>(false);

  // Fetch product detail
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await dispatch(getProductDetail({ id: Number(id) }));
        if (getProductDetail.fulfilled.match(response)) {
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetail();
  }, [dispatch, id]);

  // Handler: Place Order
  return (
    <div className="container pt-2">
      {model && <ModelAlert setModel={setModel} />}
      {productDetail ? (
        productDetail.map((products) => (
          <div key={products.id}>
            {/* Product Info */}
            <div className="row mb-5">
              <div className="col-md-6 mb-4">
                <div className="p-3 shadow-sm">
                  <div className="text-center mb-3">
                    <Image
                      src={products.img}
                      alt="Main Product"
                      width={300}
                      height={300}
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="border-bottom pb-2">Tổng quan sản phẩm</h5>
                  <div className="row g-3 gap-1 mt-2">
                    {products.thumbnails.map((thum) => (
                      <div
                        key={thum.id}
                        className="border p-1"
                        style={{
                          cursor: "pointer",
                          inlineSize: "100px",
                          blockSize: "100px",
                        }}
                      >
                        <Image
                          src={thum.src}
                          alt="Thumbnail"
                          width={100}
                          height={100}
                          className="img-fluid"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right :  Product Details */}
              <div className="col-md-6">
                <div className="p-4">
                  {products.info.map((info) => (
                    <div key={info.id}>
                      <p className="mb-3">
                        <strong>{info.name}:</strong>
                        {info.value.map((v) => (
                          <span key={v.id} className="px-2">
                            {v.value}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 mb-4">
                    <button className="btn rounded-0 border-2 border-success">
                      THÊM VÀO GIỎ HÀNG
                    </button>
                    <button className="btn btn-success rounded-0">
                      THÊM VÀO YÊU THÍCH
                    </button>
                    <button className="btn btn-success rounded-0">
                      MUA NGAY
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white p-3 border position-relative productDescription">
              <div>
                <div
                  className={`transition-all overflow-hidden ${
                    expanded ? "" : "text-truncate"
                  }`}
                  style={{ maxBlockSize: expanded ? "100%" : "300px" }}
                >
                  <p className="fs-5">{products.description}</p>
                </div>
                {!expanded && (
                  <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                      blockSize: "60px",
                      background: "linear-gradient(to top, white, transparent)",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Toggle Description */}
            <div className="text-center mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "Ẩn bớt" : "Xem thêm"}
              </button>
            </div>

            {/* Related Products */}
            <div>
              <ProductContainer/>
            </div>
          </div>
        ))
      ) : (
        <div className="d-flex align-items-center justify-content-center container min-vh-100">
          <SpinAnimation />
        </div>
      )}
    </div>
  );
}
