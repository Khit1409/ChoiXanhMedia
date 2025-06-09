"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getProductDetail } from "@/redux/slices/page.content.slice";
import axios from "axios";

export default function ManagerProductDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const paramId = useSearchParams();
  const id = paramId.get("id");

  const { productDetail } = useSelector((state: RootState) => state.products);

  const [forms, setForms] = useState<
    Array<{
      id: number;
      name: string;
      price: string;
      sale: string;
      description: string;
      img: string;
    }>
  >([]);

  useEffect(() => {
    if (id) dispatch(getProductDetail({ id: Number(id) }));
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail && Array.isArray(productDetail)) {
      const mapped = productDetail.map((p) => ({
        id: p.id,
        name: p.name || "",
        price: p.price?.toString() || "",
        sale: p.sale?.toString() || "",
        description: p.description || "",
        img: p.img || "",
      }));
      setForms(mapped);
    }
  }, [productDetail]);

  const handleChange = (index: number, name: string, value: string) => {
    setForms((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [name]: value } : f))
    );
  };

  const handleSubmit = async (index: number) => {
    const form = forms[index];
    try {
      const response = await axios.post(
        "http://localhost:8000/api/update-product",
        form,
        { withCredentials: true }
      );
      alert("Cập nhật thành công sản phẩm ID " + form.id);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật sản phẩm ID " + form.id);
    }
  };

  return (
    <div className="mt-4">
      <h2>Quản lý sản phẩm</h2>
      {forms.map((form, index) => (
        <form
          key={form.id}
          className="p-4 rounded mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(index);
          }}
        >
          <h5>Sản phẩm: {form.name}</h5>

          <div className="mb-2">
            <label className="form-label">Tên</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Giá</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={form.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Giảm giá</label>
            <input
              type="number"
              name="sale"
              className="form-control"
              value={form.sale}
              onChange={(e) => handleChange(index, "sale", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Giảm giá</label>
            <input
              type="number"
              name="sale"
              className="form-control"
              value={form.sale}
              onChange={(e) => handleChange(index, "sale", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Ảnh đại diện (URL)</label>
            <input
              type="text"
              name="img"
              className="form-control"
              value={form.img}
              onChange={(e) => handleChange(index, "img", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Mô tả</label>
            <textarea
              name="description"
              className="form-control"
              rows={3}
              value={form.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
          </div>
          <button className="btn btn-primary">Cập nhật</button>
        </form>
      ))}
    </div>
  );
}
