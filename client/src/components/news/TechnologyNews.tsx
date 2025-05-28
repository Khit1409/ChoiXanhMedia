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
  const [newsTech, setNewsTech] = useState<NewsResponseItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTN = async () => {
      try {
        const res = await axios.get(
          `https://choixanh.com.vn/ww2/module.tintuc.asp?id=35150&sl=30&pageid=1`
        );
        if (Array.isArray(res.data)) {
          setNewsTech(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTN();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-muted py-5 fs-5">Đang tải tin tức...</p>
    );
  }

  return (
    <div className="py-4">
      <section>
        <h1 className="h4 fw-bold text-info mb-4">Công nghệ</h1>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {newsTech &&
            newsTech.map((news) =>
              news.data.map((newx) => (
                <div key={newx.id} className="col">
                  <Link
                    href={newx.url}
                    className="d-flex gap-3 text-decoration-none"
                  >
                    <Image
                      src={newx.hinhdaidien}
                      width={200}
                      height={150}
                      alt={newx.tieude}
                      className="flex-shrink-0"
                    />
                    <div>
                      <p className="text-primary fw-semibold mb-1">
                        {newx.tieude}
                      </p>
                      <div
                        className="text-dark small mb-1"
                        dangerouslySetInnerHTML={{
                          __html: newx.noidungtomtat,
                        }}
                      />
                      <p className="text-muted small ">
                        Đăng ngày:{" "}
                        {new Date(newx.ngaydang).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            )}
        </div>
      </section>
    </div>
  );
}
