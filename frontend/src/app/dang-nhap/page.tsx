"use client";
import SignIn from "@/components/form/SignIn";
import { checkAuth } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loggedIn } = useSelector((state: RootState) => state.auths);
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await dispatch(checkAuth());
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuth();
  }, [dispatch]);

  return loggedIn ? router.push("/") : <SignIn />;
}
