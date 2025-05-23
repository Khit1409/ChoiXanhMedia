"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function TransactionHistory() {
  const { decoded } = useSelector((state: RootState) => state.auths);
  return (
    <div className="py-5 mx-auto d-flex align-items-center justify-content-center border border-light shadow">
      <div className="container-sm p-3">
        <h5 className="border-bottom">Lịch sử giao dịch</h5>
        <ul className="list-unstyled gap-2 d-flex flex-column">
          <li>
            <strong> User name:</strong>

            <span>{decoded?.users.userid}</span>
          </li>
          <li>
            <strong>Số mặt hàng:</strong>
            <span>0</span>
          </li>
          <li>
            <strong>Trị giá:</strong>
            <span>0</span> VND
          </li>
        </ul>
      </div>
    </div>
  );
}
