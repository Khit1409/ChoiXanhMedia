"use client";

import CommentReviewer from "@/components/news/CommentReviewer";
import News from "@/components/news/News";
import ProductContainer from "@/components/products/ProductContainer";

export default function Home() {
  return (
    <main>
      <ProductContainer />
      <CommentReviewer />
      <News />
    </main>
  );
}
