"use client";
import { getPageCategories } from "@/redux/slices/custom.page.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faFolderOpen,
  faHouse,
  faPlus,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const { category } = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPageCategories());
  }, [dispatch, category?.length]);

  const deletePage = async (id: number) => {
    const res = await axios.post(
      `http://localhost:8000/api/delete-page?id=${id}`
    );

    if (res.data.resultCode == 1) {
      alert(res.data.message);
    } else {
      alert("Thất bại");
    }
  };

  return (
    <div className="p-3">
      <div className="bg-white text-center p-3 rounded mb-3">
        <h4 className="m-0 text-uppercase">Quản trị dữ liệu trên web</h4>
      </div>
      <div className="mb-2 position-fixed">
        <button
          className="btn btn-success"
          onClick={() => window.location.reload()}
        >
          <FontAwesomeIcon icon={faRefresh} /> Cập nhật thay đổi
        </button>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Link href="/admin/add-new-page" className="btn btn-success shadow-sm">
          <FontAwesomeIcon icon={faPlus} className="me-1" /> Thêm trang mới
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-primary text-uppercase">
            <tr>
              <th style={{ inlineSize: "5%" }}>ID</th>
              <th style={{ inlineSize: "40%" }}>Tiêu đề</th>
              <th style={{ inlineSize: "25%" }}>Ngày tạo</th>
              <th style={{ inlineSize: "30%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td className="text-start px-3">
                <Link
                  href={`/admin/edit-home-page`}
                  className="text-dark me-2 p-1 rounded"
                >
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
                <Link
                  href={`/admin/edit-home-page`}
                  className="text-decoration-none text-dark fw-semibold"
                >
                  Home
                </Link>
              </td>
              <td>dd-mm-yy hh:mm:ss</td>
              <td>
                <button className="btn btn-sm btn-warning">Sửa</button>
              </td>
            </tr>
            {category?.map((cate) => (
              <tr key={cate.id}>
                <td>{cate.id}</td>
                <td className="text-start px-3">
                  <Link
                    href={`/admin/edit-child-category?id=${cate.id}`}
                    className="text-dark me-2 border p-1 rounded text-center"
                  >
                    <FontAwesomeIcon icon={faFolderOpen} />
                  </Link>
                  <Link
                    href={`/admin/edit-parent-page?id=${cate.id}`}
                    className="text-decoration-none text-dark fw-semibold"
                  >
                    {cate.name}
                  </Link>
                </td>
                <td>{cate.created_at.toLocaleString()}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-sm btn-primary">Thêm</button>
                    <button className="btn btn-sm btn-warning">Sửa</button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deletePage(cate.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
