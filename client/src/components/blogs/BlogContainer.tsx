"use client";
import { getBlog } from "@/redux/slices/page.content.slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

export default function BlogContainer() {
  const { blogs } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const id = searchParams.get("contentId") ? searchParams.get("contentId") : 0;

  useEffect(() => {
    const fetchNews = async () => {
      await dispatch(getBlog({ id: Number(id) }));
    };
    fetchNews();
  }, [dispatch, id]);

  return blogs?.length ? (
    <section className="container-fluid py-5">
      <h4 className="fw-bold text-success border-bottom border-3 border-success pb-2 mb-4">
        BÀI VIẾT
      </h4>

      <div className="row row-cols-1 row-md-cols-3 row-lg-cols-4 g-4">
        {blogs.map((blog) =>
          blog.data.map((item) => (
            <div className="col-md-4 col-lg-3" key={item.id}>
              <Link href={item.url} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm border-0">
                  <Image
                    src={item.img}
                    width={400}
                    height={250}
                    alt={item.name}
                    className="card-img-top object-fit-cover"
                    style={{ blockSize: "200px" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title fw-bold">{item.name}</h6>
                    <small className="text-muted">
                      {item.created_at.toLocaleString()}
                    </small>
                    <p className="card-text mt-2 text-secondary">
                      {item.description.length > 120
                        ? item.description.slice(0, 120) + "..."
                        : item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  ) : (
    <div className="min-vh-100 container py-5">
      <h4 className="fw-bold text-success border-bottom border-3 border-success pb-2 mb-4">
        BÀI VIẾT
      </h4>
      <div className="d-flex align-items-center justify-content-center min-vh-50">
        <p>Chưa có bài viết nào</p>
      </div>
    </div>
  );
}
