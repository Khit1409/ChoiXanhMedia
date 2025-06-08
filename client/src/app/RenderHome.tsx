"use client";

import BlogContainer from "@/components/blogs/BlogContainer";
import Map from "@/components/items/Map";
import ProductContainer from "@/components/products/ProductContainer";
import React from "react";

interface Data {
  id: number;
  allowShowProduct: boolean;
  allowShowBlog: boolean;
  allowShowMap: boolean;
  title: string;
  pageName: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  meta_keyword: [string];
}

export default function RenderHome({ custom }: { custom: Data[] }) {
  return (
    <div>
      {custom?.map((cus) => (
        <React.Fragment key={cus.id}>
          {cus.allowShowProduct && <ProductContainer />}
          {cus.allowShowBlog && <BlogContainer />}
          {cus.allowShowMap && <Map />}
        </React.Fragment>
      ))}
    </div>
  );
}
