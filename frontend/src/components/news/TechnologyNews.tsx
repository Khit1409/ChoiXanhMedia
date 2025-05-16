"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface NewsItem {
  id: string;
  ngaydang: string;
  hinhdaidien: string;
  tieude: string;
  url: string;
  noidungtomtat: string;
}

export interface NewsResponseItem {
  recordsTotal: number;
  recordsFiltered: number;
  kieu: string;
  module: string;
  tenham: string;
  data: NewsItem[];
}

export default function TechnologyNews() {
  const [news, setNews] = useState<NewsResponseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `http://demodienmay.181.atoz.vn/ww2/module.tintuc.trangchu.asp?id=35013`
        );
        if (Array.isArray(res.data)) {
          setNews(res.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        Đang tải tin tức...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Tin tuyển dụng */}
      <section>
        <h1 className="text-2xl font-bold text-cyan-600 mb-6">
          📢Chồi Xanh Media Tuyển Dụng
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((group) =>
            group.data.map((n) => (
              <Link
                href={`/news/${n.url}`}
                key={n.id}
                className="border rounded-xl overflow-hidden shadow hover:shadow-lg bg-white transition duration-200 flex flex-col"
              >
                {n.hinhdaidien ? (
                  <Image
                    src={`http://demodienmay.181.atoz.vn${n.hinhdaidien}`}
                    alt={n.tieude}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                    Không có hình ảnh
                  </div>
                )}

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-cyan-500 mb-2">
                    {n.tieude}
                  </h3>
                  <div
                    className="text-gray-600 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: n.noidungtomtat }}
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Đăng ngày:{" "}
                    {new Date(n.ngaydang).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
