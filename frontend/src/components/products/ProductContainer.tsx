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
import SpinAnimation from "../items/SpinAnimation";
import Filter from "../tools/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function ProductContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<DataProductResponse[]>([]);
  const [filterItems, setFilterItems] = useState(false);
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
      }
    };

    fetchProducts();
  }, [dispatch, url]);
  const toggleOpenFilter = () => {
    setFilterItems(!filterItems);
  };
  return (
    <section className="container-fluid py-5">
      {/* Bộ lọc sản phẩm */}
      <div className="pb-5">
        <button className="btn border-success" onClick={toggleOpenFilter}>
          <FontAwesomeIcon icon={faFilter} className="text-success" /> Lọc sản
          phẩm
        </button>
      </div>
      {filterItems && <Filter />}
      <h6 className="fw-bold text-success border-bottom border-3 border-success">
        SẢN PHẨM
      </h6>
      {/* product container */}
      {products && products.length > 0 ? (
        products.map((items) => (
          <div
            key={`group-${items.id || items.url || Math.random()}`}
            className="p-4 mb-4"
          >
            <h4 id={toSlug(items.tieude)}>
              {items.tieude.toLocaleUpperCase()}
            </h4>
            {/* sản phẩm */}
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
              {items.data.map((product_detail) =>
                product_detail.hinhdaidien ? (
                  <div className="col" key={`product-${product_detail.id}`}>
                    <Link
                      href={`/san-pham/chi-tiet/${product_detail.id}`}
                      className="border h-100 bg-white d-block text-decoration-none text-dark p-2 zoom-hover"
                    >
                      {product_detail.giakhuyenmai &&
                        product_detail.giakhuyenmai > 0 && (
                          <div className="mb-2">
                            <span className="p-1 text-bg-danger rounded">
                              {product_detail.giakhuyenmai}
                            </span>
                          </div>
                        )}

                      <div className="d-flex justify-content-center">
                        <Image
                          src={`${product_detail.hinhdaidien}`}
                          alt={product_detail.tieude || ""}
                          width={100}
                          height={100}
                          className="img-fluid"
                        />
                      </div>
                      <div className="" style={{ maxInlineSize: "100%" }}>
                        <p className="text-truncate">{product_detail.tieude}</p>
                        <p className="text-danger">
                          &#8363; {Number(product_detail.gia)}
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
        <div className="d-flex align-items-center justify-content-center container">
          <SpinAnimation />
        </div>
      )}
    </section>
  );
}
