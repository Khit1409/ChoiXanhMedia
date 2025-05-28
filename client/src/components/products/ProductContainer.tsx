"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { AppDispatch } from "@/redux/store";
import { getAllProduct } from "@/slices/productSlice";
import { DataProductResponse } from "@/types/productTypes";
import { toSlug } from "@/redux/utils";

import SpinAnimation from "../items/SpinAnimation";
import Filter from "../tools/Filter";

export default function ProductContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { url } = useParams();

  const [products, setProducts] = useState<DataProductResponse[]>([]);
  const [filterItems, setFilterItems] = useState(false);

  // Fetch sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dispatch(getAllProduct());
        if (getAllProduct.fulfilled.match(response)) {
          const productsData = response.payload.filter(
            (pro) => toSlug(pro.tieude) === url
          );
          setProducts(
            productsData.length !== 0 ? productsData : response.payload
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [dispatch, url]);

  // Toggle bộ lọc
  const handleToggleFilter = () => {
    setFilterItems((prev) => !prev);
  };

  return (
    <section className="container-fluid py-5">
      {/* Bộ lọc sản phẩm */}
      <div className="pb-4">
        <button className="btn border-success" onClick={handleToggleFilter}>
          <FontAwesomeIcon icon={faFilter} className="text-success" /> Lọc sản
          phẩm
        </button>
      </div>

      {filterItems && <Filter />}

      <h6 className="fw-bold text-success border-bottom border-3 border-success">
        SẢN PHẨM
      </h6>

      {/* Hiển thị danh sách sản phẩm */}
      {products && products.length > 0 ? (
        products.map((items) => (
          <div
            key={`group-${items.id || items.url || Math.random()}`}
            className="p-4 mb-4"
          >
            <h4 id={toSlug(items.tieude)}>{items.tieude.toUpperCase()}</h4>

            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
              {items.data.map((product) =>
                product.hinhdaidien ? (
                  <div className="col" key={`product-${product.id}`}>
                    <Link
                      href={`/san-pham/chi-tiet/${product.id}`}
                      className="border h-100 bg-white d-block text-decoration-none text-dark p-2 zoom-hover"
                    >
                      {/* Khuyến mãi */}
                      {product.giakhuyenmai && product.giakhuyenmai > 0 && (
                        <div className="mb-2">
                          <span className="p-1 text-bg-danger rounded">
                            {product.giakhuyenmai}
                          </span>
                        </div>
                      )}

                      {/* Hình ảnh */}
                      <div className="d-flex justify-content-center mb-2">
                        <Image
                          src={product.hinhdaidien}
                          alt={product.tieude || ""}
                          width={100}
                          height={100}
                          className="img-fluid"
                        />
                      </div>

                      {/* Thông tin */}
                      <div>
                        <p className="text-truncate">{product.tieude}</p>
                        <p className="text-danger">
                          &#8363; {Number(product.gia)}
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
        <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center">
          <SpinAnimation />
        </div>
      )}
    </section>
  );
}
