"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { checkAuth } from "@/redux/slices/authSlice";
import SignInPage from "./dang-nhap/page";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import SpinAnimation from "@/components/items/SpinAnimation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  //call api
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  //public router
  const publicRoutes = [
    "/",
    "/dang-nhap",
    "/dang-ky",
    "/giai-tri",
    "/tin-tuc",
    "/tuyen-dung",
    "/tin-tuc/tin-cong-nghe",
    "/tin-tuc/nhip-song-so",
  ];

  //state sign in
  const { loggedIn, loading } = useSelector((state: RootState) => state.auths);

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!loading && !loggedIn && !isPublicRoute) {
    // Nếu chưa login và không phải trang công khai => trả về trang chủ hoặc login
    return loading ? (
      <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center">
        <SpinAnimation />
      </div>
    ) : (
      <div>
        <Header />
        <SignInPage />
        <Footer />
      </div>
    );
  }

  // Nếu đã login hoặc đang ở trang công khai
  return <div>{children}</div>;
}
