"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Profile() {
  const { users} = useSelector((state: RootState) => state.auths);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border rounded-4">
            <div className="card-header text-center rounded-top-4">
              <h4 className="mb-0">Thông tin khách hàng</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>User name:</strong>
                  <span>{users?.userid || "Không rõ"}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Số mặt hàng:</strong>
                  <span>0</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Trị giá:</strong>
                  <span>0 VND</span>
                </li>
              </ul>
            </div>
            <div className="card-footer text-muted text-end small">
              Cập nhật lần cuối: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
