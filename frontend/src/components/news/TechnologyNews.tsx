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
  const [newsTech, setNewsTech] = useState<NewsResponseItem[]>([]);
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
    // tech news
    const fetchTN = async () => {
      try {
        const res = await axios.get(
          `https://choixanh.com.vn/ww2/module.tintuc.trangchu.asp?id=35139&sl=9&pageid=1`
        );
        if (Array.isArray(res.data)) {
          setNewsTech(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTN();
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
        <h1 className="text-2xl font-bold text-cyan-600 mb-6">Tuyển Dụng</h1>
        <div className="grid grid-cols-1 gap-2">
          {news.map((group) =>
            group.data.map((n) => (
              <Link href={`${n.url}`} key={n.id} className="flex gap-2">
                <Image
                  src={`http://demodienmay.181.atoz.vn${n.hinhdaidien}`}
                  alt={n.tieude}
                  width={200}
                  height={200}
                  className=""
                />

                <div className="flex flex-col gap-2">
                  <p className="text-cyan-500 ">{n.tieude}</p>
                  <p dangerouslySetInnerHTML={{ __html: n.noidungtomtat }} />
                  <p className="text-xs text-gray-400">
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
      {/*----Công nghệ----*/}
      <section>
        <h1 className="text-2xl font-bold text-cyan-600 mb-6">Công nghệ</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          {newsTech &&
            newsTech.map((news) =>
              news.data.map((newx) => (
                <Link href={newx.url} key={newx.id} className="flex gap-2">
                  <Image
                    src={`${newx.hinhdaidien}`}
                    width={200}
                    height={200}
                    alt={`${newx.tieude}`}
                  />
                  <div>
                    <p className="text-blue-500 hover:underline">
                      {newx.tieude}
                    </p>
                    <p
                      dangerouslySetInnerHTML={{ __html: newx.noidungtomtat }}
                    />
                    <p className="text-xs text-gray-400">
                      Đăng ngày:{" "}
                      {new Date(newx.ngaydang).toLocaleDateString("vi-VN", {
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
