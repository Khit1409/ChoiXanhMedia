"use client";

import { getAllProduct } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { DataProductResponse } from "@/types/productTypes";
import { toSlug } from "@/redux/utils";
import { useParams } from "next/navigation";

export default function ProductAnother() {
  const dispatch = useDispatch<AppDispatch>();
  const [mess, setMess] = useState("");
  const [products, setProducts] = useState<DataProductResponse[]>([]);
  const { url } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dispatch(getAllProduct());
        if (getAllProduct.fulfilled.match(response)) {
          const productsData = response.payload.filter(
            (pro) => toSlug(pro.tieude) === url
          );
          if (productsData.length != 0) {
            setProducts(productsData);
          } else {
            setProducts(response.payload);
          }
        }
      } catch (error) {
        console.error(error);
        setMess("Có lỗi xảy ra khi tải sản phẩm");
      }
    };

    fetchProducts();
  }, [dispatch, url]);
  return (
    <section className="container py-4">
      {/* product container */}
      <div className="d-flex flex-column gap-4">
        {products && products.length > 0 ? (
          products.map((items) => (
            <div
              key={`group-${items.id || items.url || Math.random()}`}
              className="p-4 mb-4"
            >
              {/* sản phẩm */}
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                {items.data.map((product_detail) =>
                  product_detail.hinhdaidien ? (
                    <div className="col" key={`product-${product_detail.id}`}>
                      <Link
                        href={`/san-pham/chi-tiet/${product_detail.id}`}
                        className="border d-block text-decoration-none text-dark p-2"
                      >
                        <div className="mb-2">
                          <span className="p-1 text-bg-danger rounded">
                            HOT
                          </span>
                        </div>
                        <div className="d-flex justify-content-center">
                          <Image
                            src={`http://choixanh.com.vn${product_detail.hinhdaidien}`}
                            alt={product_detail.tieude || ""}
                            width={100}
                            height={100}
                            className="img-fluid"
                          />
                        </div>
                        <div className="" style={{ maxInlineSize: "100%" }}>
                          <p className="text-truncate">
                            {product_detail.tieude}
                          </p>
                          <p className="text-danger">
                            &#8363; {product_detail.gia}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center vh-100">
            <p className="text-center">{mess}</p>
          </div>
        )}
      </div>
    </section>
  );
}
