"use client";

import CommentReviewer from "@/components/news/CommentReviewer";
import Entertaiment from "@/components/news/Entertaiment";
import TechLife from "@/components/news/TechLife";
import ProductContainer from "@/components/products/ProductContainer";
import Banner from "@/components/sections/Banner";

export default function Home() {
  return (
    <main>
      <Banner />
      <ProductContainer />
      <CommentReviewer />
      <TechLife />
      <Entertaiment />
    </main>
  );
}
