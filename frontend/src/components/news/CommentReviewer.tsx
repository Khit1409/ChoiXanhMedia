"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface YKienKhachHangItem {
  id: string;
  ngaydang: string;
  hinhdaidien: string;
  tieude: string;
  url: string;
  noidungtomtat: string;
}

export interface YKienKhachHangResponse {
  module: string;
  tenham: string;
  tieude: string;
  url: string;
  metatitle: string;
  metakeywords: string;
  metadescriptions: string;
  NhomTruyVan: string;
  kieu: string;
  recordsTotal: number;
  recordsFiltered: number;
  data: YKienKhachHangItem[];
}

export default function CommentReviewer() {
  const [comments, setComments] = useState<YKienKhachHangResponse[]>();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `https://choixanh.com.vn/ww2/module.tintuc.asp?id=35281`
        );
        if (res.data) {
          setComments(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchComment();
  }, []);

  return (
    <div className="py-3">
      <h2 className="text-center fw-bold mb-4 text-dark">Ý Kiến Khách Hàng</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {comments &&
          comments.map((comment) =>
            comment.data.map((db) => (
              <div className="col-12 col-md-6 col-lg-4 " key={db.id}>
                <div className="bg-white px-1 shadow-sm h-100">
                  <div className="d-flex gap-3 align-items-start">
                    <div>
                      <Image
                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                        alt={db.tieude}
                        width={80}
                        height={80}
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <p className="fw-semibold h6 text-dark mb-1">
                        {db.tieude}
                      </p>
                      <p className="text-muted small mb-2">{db.ngaydang}</p>
                      <div
                        className="text-secondary small"
                        dangerouslySetInnerHTML={{ __html: db.noidungtomtat }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
}
