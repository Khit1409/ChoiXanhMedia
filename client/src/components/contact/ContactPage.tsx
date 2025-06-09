import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thông tin liên hệ đã được gửi!");
    // Sau này bạn có thể POST tới API backend ở đây
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Liên hệ với chúng tôi</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Họ tên</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nội dung</label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Gửi liên hệ
        </button>
      </form>
    </div>
  );
}
