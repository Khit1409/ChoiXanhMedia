"use client";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ProductContainer from "@/components/products/ProductContainer";
import BlogContainer from "@/components/blogs/BlogContainer";
import { fetchCustom } from "@/redux/slices/custom.page.slice";
import { useSearchParams } from "next/navigation";
import ContactPage from "@/components/contact/ContactPage";

/*
Thường component này sẽ có lỗi là Faild to constuct 'URL':invalid URL
Lỗi này do đường dẫn file ảnh bị rỗng hoặc lỗi, check lại
*/

export default function RenderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { custom } = useSelector((state: RootState) => state.menus);

  const params = useSearchParams();
  const id = params.get("id");
  const type = params.get("type");

  useEffect(() => {
    console.log("type:", type); //
    dispatch(fetchCustom({ id: Number(id), type: type ? type : "" }));
  }, [dispatch, type, id]);

  return (
    <div>
      {custom?.map((cus) => {
        let content = null;
        switch (cus.pageType) {
          case "product":
            content = <ProductContainer />;
            break;
          case "contact":
            content = <ContactPage />;
          case "blog":
            content = <BlogContainer />;
            break;
          default:
            content = <div>Loại trang không hỗ trợ: {cus.pageType}</div>;
        }
        return <div key={cus.id}>{content}</div>;
      })}
    </div>
  );
}
