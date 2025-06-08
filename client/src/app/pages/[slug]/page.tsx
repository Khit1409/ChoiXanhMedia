import axios from "axios";
import { Metadata } from "next";
import RenderPage from "./RenderPage";

type Props = {
  params: { slug: string };
  searchParams: { id?: string; type?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { id, type } = searchParams;

  if (!id || !type) return {};

  const response = await axios.get(
    `http://localhost:8000/api/custom-page?type=${type}&id=${id}`
  );

  const data = response.data?.seo?.[0];

  return {
    title: data?.title || "Default title",
    description: data?.description || "Default description",
    keywords: data?.meta_keyword?.[0]?.content?.split(",") ?? [],
  };
}

export default function Page() {
  return <RenderPage />;
}
