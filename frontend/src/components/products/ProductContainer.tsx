"use client";

import { getAllProduct } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import {
  faCartPlus,
  faFilter,
  faHeart,
  faList,
  faMoneyBill,
  faTag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { DataProductResponse } from "@/types/productTypes";
import Filter from "../tools/Filter";
import SearchForm from "../form/SearchForm";

export default function ProductContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const [mess, setMess] = useState("");
  const [products, setProducts] = useState<DataProductResponse[] | null>([]);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await dispatch(getAllProduct());
        if (getAllProduct.fulfilled.match(results)) {
          setProducts(results.payload);
          setMess("Thành công");
        }
      } catch (error) {
        console.error(error);
        setMess("Có lỗi xảy ra khi tải sản phẩm");
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <section className="w-full px-8 py-6 bg-gray-100">
      {/* filter/search */}
      <div className="my-6 bg-gray-200 rounded shadow-lg px-2 flex items-center justify-around py-3">
        <SearchForm />{" "}
        <button
          className="bg-green-600 py-1 px-5 rounded-full text-white"
          onClick={() => setOpenFilter(!openFilter)}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </div>
      {openFilter && <Filter />}
      {/* container products */}
      <div className="flex flex-col gap-5">
        {products && products.length > 0 ? (
          products.map((items) => (
            <div
              key={`group-${items.id || items.url || Math.random()}`}
              className="shadow-md p-4 rounded-lg bg-white"
            >
              <div className="mb-3 text-center border-b">
                <h2 className="text-2xl font-bold text-blue-600">
                  {items.tieude.toUpperCase()}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.data.map(
                  (product_detail) =>
                    product_detail.hinhdaidien && (
                      <div
                        key={`product-${
                          product_detail.id ||
                          product_detail.tieude ||
                          Math.random()
                        }`}
                        className="bg-white shadow-md rounded-xl p-3 flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="text-center border-b pb-2 font-bold text-cyan-500">
                          {product_detail.tieude}
                        </div>

                        <Image
                          src={`http://demodienmay.181.atoz.vn${product_detail.hinhdaidien}`}
                          alt={product_detail.tieude || ""}
                          width={750}
                          height={750}
                          className="rounded-md object-cover mt-2"
                        />

                        <div className="flex flex-col gap-3 mt-4 text-sm px-2">
                          <p className="font-bold border-b">
                            <span className="pr-2">
                              <FontAwesomeIcon icon={faList} />
                            </span>
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
                                    className="flex gap-2 items-center"
                                    key={`attr-${name}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTag}
                                      className="text-cyan-500"
                                    />
                                    <strong className="text-cyan-500">
                                      {name}
                                    </strong>
                                    <div className="flex gap-2 flex-wrap">
                                      {value.map((vl) =>
                                        vl?.tengoi && vl?.url ? (
                                          <a
                                            key={`val-${name}-${
                                              vl.url ||
                                              vl.tengoi ||
                                              Math.random()
                                            }`}
                                            className="text-cyan-600 underline"
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

                          <div className="flex gap-2 items-center text-green-700">
                            <FontAwesomeIcon icon={faMoneyBill} />
                            <strong>Giá khuyến mại:</strong>
                            <p>{product_detail.giakhuyenmai}</p>
                          </div>
                          <div className="flex gap-2 items-center text-green-700">
                            <FontAwesomeIcon icon={faTags} />
                            <strong>Giá bán:</strong>
                            <p>{product_detail.gia}</p>
                          </div>
                        </div>

                        <div className="flex justify-between gap-2 mt-4 px-2">
                          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg">
                            <FontAwesomeIcon icon={faCartPlus} />
                          </button>
                          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                          <Link
                            href={`/san-pham/chi-tiet/${items.url}/${product_detail.id}`}
                            className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen flex items-center justify-center">
            <p className="text-center">{mess}</p>
          </div>
        )}
      </div>
    </section>
  );
}
