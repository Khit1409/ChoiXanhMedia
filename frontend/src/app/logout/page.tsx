"use client";

import { logout } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  useEffect(() => {
    const fetchLogout = async () => {
      try {
        await dispatch(logout());
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogout();
  }, [dispatch]);
  return loggedIn && router.push("/dang-nhap");
}
