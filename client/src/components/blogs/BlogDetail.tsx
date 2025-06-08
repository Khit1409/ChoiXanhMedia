"use client";

import { getBlogDetail } from "@/redux/slices/page.content.slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BlogDetail() {
  const params = useSearchParams();
  const id = params.get("id");
  const dispatch = useDispatch<AppDispatch>();
  const { blogDetail } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(getBlogDetail({ id: Number(id) }));
    }
  }, [dispatch, id]);

  return (
    <div className="container py-4">
      {blogDetail?.map((blog) => (
        <div key={blog.id} className="card mb-4 shadow-sm">
          <Image
            src={blog.img}
            alt={blog.name}
            className="card-img-top"
            style={{
              blockSize: "auto",
              objectFit: "cover",
              inlineSize: "auto",
            }}
            width={200}
            height={400}
          />
          <div className="card-body">
            <h2 className="card-title">{blog.name}</h2>
            <p className="text-muted">
              {new Date(blog.created_at).toLocaleString()}
            </p>
            <p className="card-text fw-bold">{blog.description}</p>
            <hr />
            <div className="card-text" style={{ whiteSpace: "pre-line" }}>
              {blog.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
