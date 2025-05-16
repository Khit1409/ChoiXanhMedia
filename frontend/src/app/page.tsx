"use client";

import CommentReviewer from "@/components/news/CommentReviewer";
import TechnologyNews from "@/components/news/TechnologyNews";
import ProductContainer from "@/components/products/ProductContainer";

export default function Home() {
  return (
    <main>
      <ProductContainer />
      <CommentReviewer />
      <TechnologyNews />
    </main>
  );
}
