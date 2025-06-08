"use client";
import { getPageCategories } from "@/redux/slices/custom.page.slice";
import { createBlog } from "@/redux/slices/page.content.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface FormData {
  category_name: string;
  filter_url: string;
  blog_name: string;
  description: string;
  img: string;
  url: string;
  content: string;
}

export default function AddNewArticle() {
  const { category } = useSelector((state: RootState) => state.menus);
  const [parentId, setParentId] = useState<number>();
  const [filter_url, setUrl] = useState<string>("");
  const [request, setRequest] = useState<FormData>({
    category_name: "",
    filter_url: "",
    blog_name: "",
    description: "",
    img: "",
    url: "",
    content: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPageCategories());
  }, [dispatch]);

  const handleOnchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "category_name") {
      const selected = category
        ?.flatMap((cat) => cat.child)
        .find((item) => item.name === value);
      if (selected) {
        setParentId(selected.id);
        setUrl(selected.url);
      }
    }

    setRequest({
      ...request,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        createBlog({
          blog_name: request.blog_name,
          category_name: request.category_name,
          content: request.content,
          filter_url: filter_url,
          parentId: Number(parentId),
          url: request.url ?? filter_url,
          description: request.description,
          img: request.img,
        })
      );
      if (res.payload == 1) {
        alert("Thêm bài viết thành công!");
      
      } else {
        alert("Thêm bài viết thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi gửi yêu cầu.");
    }
  };

  return (
    <div className="container py-4">
      <div className="border p-3 rounded bg-light mb-4">
        <h2 className="text-center m-0">THÊM BÀI VIẾT MỚI</h2>
      </div>

      <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
        {/* DANH MỤC BÀI VIẾT */}
        <div className="border p-3 rounded bg-white">
          <h4 className="text-center mb-3">DANH MỤC BÀI VIẾT</h4>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Bài viết thuộc danh mục nào?</label>
              <select
                name="category_name"
                className="form-select rounded-0"
                onChange={handleOnchange}
                value={request.category_name}
              >
                <option value="">Chọn danh mục bài viết</option>
                {category?.map((cat) =>
                  cat.child.map((item) => {
                    if (item.pageType === "blog") {
                      return (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    }
                    return null;
                  })
                )}
              </select>
            </div>
          </div>
        </div>

        {/* THÔNG TIN BÀI VIẾT */}
        <div className="border p-3 rounded bg-white">
          <h4 className="text-center mb-3">THÔNG TIN BÀI VIẾT</h4>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Tên bài viết</label>
              <input
                type="text"
                name="blog_name"
                value={request.blog_name}
                onChange={handleOnchange}
                className="form-control rounded-0"
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Mô tả</label>
              <input
                type="text"
                name="description"
                value={request.description}
                onChange={handleOnchange}
                className="form-control rounded-0"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">URL Bài viết (nếu có)</label>
              <input
                type="text"
                name="url"
                value={request.url}
                onChange={handleOnchange}
                className="form-control rounded-0"
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Nội dung</label>
              <textarea
                name="content"
                value={request.content}
                onChange={handleOnchange}
                className="form-control rounded-0"
                style={{ blockSize: "200px" }}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Ảnh đại diện bài viết</label>
              <input
                type="text"
                name="img"
                value={request.img}
                onChange={handleOnchange}
                className="form-control rounded-0"
              />
            </div>
          </div>

          <div className="py-2">
            <button className="btn btn-success" type="submit">
              <FontAwesomeIcon icon={faSave} className="me-2" />
              Thêm bài viết
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
