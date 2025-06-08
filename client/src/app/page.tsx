import { Metadata } from "next";
import RenderHome from "./RenderHome";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import PathNameComponent from "@/components/sections/header/PathNameComponent";
import Banner from "@/components/sections/Banner";
import axios from "axios";

// Hàm fetch API
async function fetchCustomHome() {
  const res = await axios.get("http://localhost:8000/api/custom-home");
  if (!res.data) throw new Error("Failed to fetch custom home");
  return res.data;
}

// Metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetchCustomHome();
    const data = response.custom[0];

    return {
      title: data?.title ?? "Trang chủ | Home page",
      description: data?.description ?? "",
      keywords: data?.meta_keyword?.[0]?.content?.split(",") ?? [],
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Error loading page",
    };
  }
}

// Component chính
export default async function Home() {
  try {
    const json = await fetchCustomHome();
    const data = json.custom;

    return (
      <div>
        <Header />
        <PathNameComponent />
        <Banner />
        <RenderHome custom={data} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Home fetch error:", error);
    return <div>Error loading home</div>;
  }
}
