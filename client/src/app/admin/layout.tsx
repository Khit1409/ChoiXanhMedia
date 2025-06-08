"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminHeader from "@/components/admin/AdminHeader";
import "./admin.css";
import AdminFooter from "@/components/admin/AdminFooter";
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { users } = useSelector((state: RootState) => state.auths);
  if (users?.roles === "admin") {
    return (
      <div style={{ minBlockSize: "100vh" }} className="d-flex bg-light">
        <AdminNavbar />
        <main className="w-100">
          <header className="bg-success">
            <AdminHeader />
          </header>
          <div className="px-2" style={{minBlockSize:"90vh"}}>{children}</div>
          <footer>
            <AdminFooter />
          </footer>
        </main>
      </div>
    );
  } else {
    return (
      <div className="min-vh-100 w-100 d-flex justify-content-center align-items-center">
        <div>
          Bạn không phải admin vui lòng đăng nhập bẳng tài khoản admin.
          <Link href="/">Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }
}
