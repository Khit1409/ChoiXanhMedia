"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageCategories } from "@/redux/slices/custom.page.slice";
import { faRefresh, faSave } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
interface RequestSeo {
  title: string;
  pageName: string;
  description: string;
  pageType: string;
  url: string;
  oldPageName: string;
}

export default function UpdateParentPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { category } = useSelector((state: RootState) => state.menus);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(getPageCategories());
  }, [dispatch]);
  const [mess, setMess] = useState("");
  const [seo, setSeo] = useState<RequestSeo>({
    title: "",
    pageName: "",
    description: "",
    pageType: "",
    url: "",
    oldPageName: "",
  });
  useEffect(() => {
    if (category) {
      const item = category?.find((c) => c.id == Number(id));
      if (item) {
        setSeo((prev) => ({
          ...prev,
          oldPageName: item.name,
        }));
      }
    }
  }, [category, id]);
  const [metakeyWord, setMetaKeyWord] = useState<string[]>([""]);

  const pageTypeList = [
    { id: 1, type: "Sản phẩm", value: "product" },
    { id: 2, type: "Tin tức", value: "news" },
    { id: 3, type: "Liên hệ", value: "contact" },
    { id: 4, type: "Bài viết", value: "blog" },
  ];

  const handleOnchangeSeo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSeo({
      ...seo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra thông tin bắt buộc
    if (
      !seo.pageName.trim() ||
      !seo.title.trim() ||
      !seo.pageType.trim() ||
      !seo.description.trim()
    ) {
      setMess("*Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      const payload = {
        ...seo,
        content: metakeyWord,
      };

      const res = await axios.put(
        `http://localhost:8000/api/update-parent-page/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setMess("✔️ Tạo trang thành công!");
      console.log("Kết quả:", res.data);
    } catch (error) {
      console.error(error);
      setMess("❌ Có lỗi xảy ra khi tạo trang.");
    }
  };

  return (
    <div className="container py-4">
      <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
        {category?.map((item) => {
          if (item.id == Number(id)) {
            return (
              <div className="border p-3 rounded bg-white" key={item.id}>
                <h4 className="text-center mb-3">CẬP NHẬT THÔNG TIN TRANG</h4>
                <h2 className="text-center">{item.name.toUpperCase()}</h2>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label me-2">
                      <strong>Tên trang cũ</strong>: {seo.oldPageName}
                    </label>
                    <input
                      type="hidden"
                      name="oldPageName"
                      onChange={handleOnchangeSeo}
                      className="rounded-0 text-secondary form-control border-0"
                      value={seo.oldPageName}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Tên trang</label>
                    <input
                      type="text"
                      name="pageName"
                      onChange={handleOnchangeSeo}
                      className="form-control rounded-0"
                      placeholder={`${item.name}`}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Đường dẫn trang</label>
                    <input
                      type="text"
                      name="url"
                      onChange={handleOnchangeSeo}
                      className="form-control rounded-0"
                      placeholder={`${item.url}`}
                    />
                    <p
                      className="mt-2"
                      style={{ fontSize: "12px", color: "green" }}
                    >
                      *Tên trang viết thường không dấu, cách nhau bằng dấu{" "}
                      {'"-"'} hoặc ghi tiếng Anh.
                    </p>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Loại trang</label>
                    <select
                      name="pageType"
                      className="form-select rounded-0"
                      onChange={handleOnchangeSeo}
                      value={seo.pageType}
                    >
                      <option value="">Thay đổi loại trang </option>
                      {pageTypeList.map((type) => (
                        <option value={type.value} key={type.id}>
                          {type.type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <hr className="my-4" />
                <h5 className="text-center mb-3">CẤU HÌNH SEO WEB</h5>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      onChange={handleOnchangeSeo}
                      className="form-control rounded-0"
                      placeholder="Mô tả trang"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Meta description</label>
                    <input
                      type="text"
                      name="description"
                      onChange={handleOnchangeSeo}
                      className="form-control rounded-0"
                      placeholder="Mô tả trang"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Meta keyword</label>
                    <input
                      type="text"
                      onChange={(e) => setMetaKeyWord([e.target.value])}
                      className="form-control rounded-0"
                      placeholder="Từ khóa cách nhau bằng dấu ','"
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-success mx-2" type="submit">
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    Lưu
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => window.location.reload()}
                  >
                    <FontAwesomeIcon icon={faRefresh} /> Cập nhật thay đổi
                  </button>
                  <p className="mt-2 text-danger">{mess}</p>
                </div>
              </div>
            );
          }
        })}
      </form>
    </div>
  );
}
