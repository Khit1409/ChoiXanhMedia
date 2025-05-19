"use client";

import { getAllProduct } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faCartPlus,
  //   faFilter,
  faHeart,
  faList,
  faMoneyBill,
  faTag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { DataProductResponse } from "@/types/productTypes";
import { reNameInfo, toSlug } from "@/redux/utils";
import { handleAddToCart } from "@/api/onclickApi";
// import { useParams } from "next/navigation";

export default function ProductContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const [mess, setMess] = useState("");
  const [products, setProducts] = useState<DataProductResponse[] | null>([]);

  //   const [openFilter, setOpenFilter] = useState(false);
  const { decoded } = useSelector((state: RootState) => state.auths);
  const url = "may-vi-tinh";
  const userid = decoded?.users.userid;
  const pass = decoded?.users.pass;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await dispatch(getAllProduct());
        if (getAllProduct.fulfilled.match(results)) {
          const filtered = results.payload.filter(
            (res) => toSlug(res.tieude) === url
          );
          if (filtered.length > 0) {
            setProducts(filtered);
          } else {
            setProducts(results.payload);
          }
        }
      } catch (error) {
        console.error(error);
        setMess("Có lỗi xảy ra khi tải sản phẩm");
      }
    };

    fetchProducts();
  }, [dispatch]);
  return (
    <section className="container py-4 bg-light">
      <div className="d-flex flex-column gap-4">
        {products && products.length > 0 ? (
          products.map((items) => (
            <div
              key={`group-${items.id || items.url || Math.random()}`}
              className="card p-4 bg-white shadow-sm mb-4"
            >
              <div
                className="mb-3"
                id={`${items.tieude.toLowerCase().split(" ").join("-")}`}
              >
                <h2 className="h4 text-white bg-primary d-inline-block px-3 py-2 rounded">
                  {items.tieude.toUpperCase()}
                </h2>
              </div>

              {/* sản phẩm */}
              <div className="row g-3">
                {items.data.map((product_detail) =>
                  product_detail.hinhdaidien ? (
                    <div
                      className="col-12 col-sm-6 col-lg-4"
                      key={`product-${product_detail.id}`}
                    >
                      <div className="card h-100 shadow-sm">
                        <div className="card-header text-center fw-bold text-info">
                          {product_detail.tieude}
                        </div>
                        <div className="text-center mt-2">
                          <Image
                            src={`http://choixanh.com.vn${product_detail.hinhdaidien}`}
                            alt={product_detail.tieude || ""}
                            width={171}
                            height={550}
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="card-body">
                          <p className="fw-bold border-bottom pb-1">
                            <FontAwesomeIcon icon={faList} className="me-2" />
                            THÔNG SỐ CHI TIẾT
                          </p>
                          {Object.entries(product_detail).map(
                            ([name, value]) => {
                              if (
                                [
                                  "tieude",
                                  "gia",
                                  "giakhuyenmai",
                                  "hinhdaidien",
                                  "hinhanh",
                                ].includes(name)
                              )
                                return null;

                              if (Array.isArray(value)) {
                                return (
                                  <div
                                    className="d-flex align-items-center mb-1"
                                    key={`attr-${name}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTag}
                                      className="text-info me-2"
                                    />
                                    <strong className="me-1 text-info">
                                      {reNameInfo(name)}:
                                    </strong>
                                    <div className="d-flex flex-wrap gap-2">
                                      {value.map((vl) =>
                                        vl?.tengoi && vl?.url ? (
                                          <a
                                            key={`val-${name}-${vl.url}`}
                                            className="text-decoration-underline text-primary"
                                            href={vl.url}
                                          >
                                            {vl.tengoi}
                                          </a>
                                        ) : null
                                      )}
                                    </div>
                                  </div>
                                );
                              }

                              return null;
                            }
                          )}

                          <div className="text-success d-flex align-items-center mt-2">
                            <FontAwesomeIcon
                              icon={faMoneyBill}
                              className="me-2"
                            />
                            <strong className="me-1">Giá khuyến mại:</strong>
                            <span>{product_detail.giakhuyenmai}</span>
                          </div>
                          <div className="text-success d-flex align-items-center">
                            <FontAwesomeIcon icon={faTags} className="me-2" />
                            <strong className="me-1">Giá bán:</strong>
                            <span>{product_detail.gia}</span>
                          </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                          <button
                            className="btn btn-success w-100 me-2"
                            onClick={() =>
                              handleAddToCart(
                                `${product_detail.id}`,
                                `${userid}`,
                                `${pass}`
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faCartPlus} />
                          </button>
                          <button className="btn btn-primary w-100 me-2">
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                          <Link
                            href={`/san-pham/chi-tiet/${items.url}/${product_detail.id}`}
                            className="btn btn-warning w-100 text-white"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
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
