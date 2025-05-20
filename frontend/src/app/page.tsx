"use client";

import CommentReviewer from "@/components/news/CommentReviewer";
import TechLife from "@/components/news/TechLife";
import ProductContainer from "@/components/products/ProductContainer";

export default function Home() {
  return (
    <main>
      <ProductContainer />
      <CommentReviewer />
      <TechLife />
    </main>
  );
}
