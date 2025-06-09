"use client";

import React, { useState } from "react";
import axios from "axios";

export default function UpdateLogo() {
  const [form, setForm] = useState({
    name: "",
    src: "",
    width: "",
    height: "",
    padding: "",
    margin: "",
    border_radius: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/update-logo-page",
        form,
        {
          withCredentials: true,
        }
      );
      if (response.data.resultCode == 1) {
        alert("Logo updated successfully");
        window.location.reload();
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error updating logo");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-start py-5">
      <form
        onSubmit={handleSubmit}
        className="w-100 d-flex flex-column justify-content-between"
        style={{
          padding: "24px",
          blockSize: "100%",
        }}
      >
        <div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Tên logo
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="form-control rounded-0 mb-3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Đường dẫn ảnh
            </label>
            <input
              type="text"
              name="src"
              placeholder="Image URL (src)"
              value={form.src}
              onChange={handleChange}
              className="form-control rounded-0 mb-3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-lable">
              Chiều rộng
            </label>
            <input
              type="text"
              name="width"
              placeholder="Width (e.g. 100px or 10%)"
              value={form.width}
              onChange={handleChange}
              className="form-control rounded-0 mb-3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="form-label">
              Chiều cao
            </label>
            <input
              type="text"
              name="height"
              placeholder="Height"
              value={form.height}
              onChange={handleChange}
              className="form-control rounded-0 mb-3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Khoảng cách logo với viền
            </label>
            <input
              type="text"
              name="padding"
              placeholder="Padding"
              value={form.padding}
              onChange={handleChange}
              className="form-control rounded-0 mb-3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Khoảng cách logo với các phần tử khác
            </label>
            <input
              type="text"
              name="margin"
              placeholder="Margin"
              value={form.margin}
              onChange={handleChange}
              className="form-control rounded-0 mb-3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="form-label">
              Bo tròn góc logo
            </label>
            <input
              type="text"
              name="border_radius"
              placeholder="Border Radius"
              value={form.border_radius}
              onChange={handleChange}
              className="form-control rounded-0 mb-4"
            />
          </div>
        </div>
        <div className="">
          <button type="submit" className="btn btn-primary">
            Update Logo
          </button>
        </div>
      </form>
    </div>
  );
}
