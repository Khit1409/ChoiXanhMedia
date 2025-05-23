"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { checkAuth } from "@/slices/authSlice";

import SpinAnimation from "@/components/items/SpinAnimation";
import Header from "@/components/sections/header";
import SignIn from "@/components/form/SignIn";
import Footer from "@/components/sections/footer";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn, loading } = useSelector((state: RootState) => state.auths);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center">
        <SpinAnimation />
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div>
        <Header />
        <SignIn />
        <Footer />
      </div>
    );
  }

  return <div>{children}</div>;
}
