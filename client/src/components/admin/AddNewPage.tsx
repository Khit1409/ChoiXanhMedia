"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageCategories } from "@/redux/slices/custom.page.slice";
import { faSave } from "@fortawesome/free-solid-svg-icons";
interface RequestSeo {
  title: string;
  pageName: string;
  description: string;
  pageType: string;
  page_url: string;
}

export default function AddNewPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { category } = useSelector((state: RootState) => state.menus);
  const [pageParentId, setPageParentId] = useState<string>("");
  useEffect(() => {
    dispatch(getPageCategories());
  }, [dispatch]);
  const [mess, setMess] = useState("");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [seo, setSeo] = useState<RequestSeo>({
    title: "",
    pageName: "",
    description: "",
    pageType: "",
    page_url: "",
  });
  const [metakeyWord, setMetaKeyWord] = useState<string[]>([""]);

  const pageTypeList = [
    { id: 1, type: "Sản phẩm", value: "product" },
    { id: 2, type: "Liên hệ", value: "contact" },
    { id: 3, type: "Bài viết", value: "blog" },
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
        meta_keyword: metakeyWord,
        page_parent_id: checkBox ? pageParentId : null,
      };

      const res = await axios.post(
        "http://localhost:8000/api/new-page",
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
        <div className="border p-3 rounded bg-white">
          <h4 className="text-center mb-3">THÔNG TIN TRANG</h4>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Tên trang</label>
              <input
                type="text"
                name="pageName"
                onChange={handleOnchangeSeo}
                className="form-control rounded-0"
                placeholder="Tên trang"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Đường dẫn trang</label>
              <input
                type="text"
                name="page_url"
                onChange={handleOnchangeSeo}
                className="form-control rounded-0"
                placeholder="Ví dụ: san-pham-moi"
              />
              <p className="mt-2" style={{ fontSize: "12px", color: "green" }}>
                *Tên trang viết thường không dấu, cách nhau bằng dấu {'"-"'}{" "}
                hoặc ghi tiếng Anh.
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
                <option value="">Chọn loại trang muốn tạo</option>
                {pageTypeList.map((type) => (
                  <option value={type.value} key={type.id}>
                    {type.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="form-label mx-2">
                Trang này là danh mục con?
              </label>
              <input
                type="checkbox"
                checked={checkBox}
                onChange={() => setCheckBox(!checkBox)}
              />
            </div>
            <div className="col-md-12">
              {checkBox ? (
                <select
                  name="page_parent_id"
                  className="form-select rounded-0"
                  onChange={(e) => setPageParentId(e.target.value)}
                >
                  <option value="">Chọn danh mục cha của trang</option>
                  {category?.map((menu) => (
                    <option value={menu.id} key={menu.id}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              ) : (
                <></>
              )}
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
                placeholder="Tên bạn muốn hiện thị trên browser"
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
            <button className="btn btn-success" type="submit">
              <FontAwesomeIcon icon={faSave} className="me-2" />
              Lưu
            </button>
            <p className="mt-2 text-danger">{mess}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
