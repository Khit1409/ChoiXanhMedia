"use client";

import Map from "@/components/items/Map";
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
      <Map />
    </main>
  );
}
