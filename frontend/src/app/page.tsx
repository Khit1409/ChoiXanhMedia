"use client";

import CommentReviewer from "@/components/news/CommentReviewer";
import News from "@/components/news/News";
import ProductContainer from "@/components/products/ProductContainer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "whitesmoke" }}>
      <div style={{ backgroundColor: "whitesmoke" }}>
        <ProductContainer />
      </div>
      <CommentReviewer />
      <News />
    </main>
  );
}
