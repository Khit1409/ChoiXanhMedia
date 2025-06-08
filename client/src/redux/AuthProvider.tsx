"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { checkAuth } from "@/redux/slices/auth.slice";

import SpinAnimation from "@/components/items/SpinAnimation";
import { useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn, loading } = useSelector((state: RootState) => state.auths);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (loggedIn == false) {
      router.push("/login");
    }
  }, [dispatch, loggedIn, router]);

  if (loading == true) {
    return (
      <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center">
        <SpinAnimation />
      </div>
    );
  }

  return <div>{children}</div>;
}
