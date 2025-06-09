"use client";
import { getProduct } from "@/redux/slices/page.content.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { toSlug } from "@/redux/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ManagerProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProduct({ id: 0 }));
  }, [dispatch]);

  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Ngày thêm</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((productGroup) =>
            productGroup.data.map((pro) => (
              <tr key={pro.id}>
                <td>{pro.id}</td>
                <td
                  className="text-truncate"
                  style={{ maxInlineSize: "400px" }}
                >
                  <Link
                    href={`/admin/manager/product/${toSlug(pro.name)}?id=${
                      pro.id
                    }`}
                  >
                    {pro.name}
                  </Link>
                </td>
                <td>{pro.price}</td>
                <td>{pro.created_at.toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
