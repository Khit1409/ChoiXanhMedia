"use client";

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";

export default function EditHomePage() {
  const [allowShowBlog, setAllowShowBlog] = useState(false);
  const [allowShowMap, setAllowShowMap] = useState(false);
  const [allowShowProduct, setAllowShowProduct] = useState(false);
  const [keyword, setKeyWord] = useState<string[]>([""]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/custom-home-page", {
      title: form.title,
      description: form.description,
      keyword,
      allowShowBlog,
      allowShowMap,
      allowShowProduct,
    });
  };

  return (
    <div className="container mt-5">
      <div className="p-4 mx-auto">
        <h2 className="text-center mb-4">Chỉnh sửa Trang Chủ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tiêu đề trang</label>
            <input
              type="text"
              name="title"
              placeholder="Nhập title"
              onChange={handleOnchange}
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Meta Description</label>
            <input
              type="text"
              name="description"
              placeholder="Mô tả trang chủ"
              onChange={handleOnchange}
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Meta Keyword</label>
            <input
              type="text"
              placeholder="Từ khóa tìm kiếm"
              onChange={(e) => setKeyWord([e.target.value])}
              className="form-control rounded-0"
            />
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={allowShowProduct}
              onChange={(e) => setAllowShowProduct(e.target.checked)}
              id="productCheck"
            />
            <label className="form-check-label" htmlFor="productCheck">
              Hiện trang thông tin sản phẩm
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={allowShowBlog}
              onChange={(e) => setAllowShowBlog(e.target.checked)}
              id="blogCheck"
            />
            <label className="form-check-label" htmlFor="blogCheck">
              Hiện trang bài viết
            </label>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={allowShowMap}
              onChange={(e) => setAllowShowMap(e.target.checked)}
              id="mapCheck"
            />
            <label className="form-check-label" htmlFor="mapCheck">
              Hiện Google Map
            </label>
          </div>

          <div>
            <button type="submit" className="btn btn-success">
              <FontAwesomeIcon icon={faSave} /> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
