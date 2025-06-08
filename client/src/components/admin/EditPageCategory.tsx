"use client";
import { getPageCategories } from "@/redux/slices/custom.page.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faFileText,
  faPlus,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EditPageCategory() {
  const { category } = useSelector((state: RootState) => state.menus);
  const paramId = useSearchParams();
  const id = paramId.get("id");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPageCategories());
  }, [dispatch]);

  const deletePage = async (id: number) => {
    const res = await axios.post(
      `http://localhost:8000/api/delete-child-page?id=${id}`
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
              <th style={{ inlineSize: "15%" }}>Parent id</th>
              <th style={{ inlineSize: "35%" }}>Tiêu đề</th>
              <th style={{ inlineSize: "20%" }}>Ngày tạo</th>
              <th style={{ inlineSize: "30%" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((cate) =>
              cate.child.map((menu) => {
                if (menu.parent_id == Number(id)) {
                  return (
                    <tr key={menu.id}>
                      <td>{menu.id}</td>
                      <td>{menu.parent_id}</td>
                      <td className="text-start px-3">
                        <Link
                          href={`/admin/edit-children-page?id=${menu.id}`}
                          className="me-2 p-1 text-center"
                        >
                          <FontAwesomeIcon
                            icon={faFileText}
                            className="text-dark me-1"
                          />
                          {menu.name}
                        </Link>
                      </td>
                      <td>{menu.created_at.toLocaleString()}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            href={`/admin/edit-children-page?id=${menu.id}`}
                            className="btn btn-sm btn-warning"
                          >
                            Sửa
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deletePage(menu.id)}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
