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
          `http://demodienmay.181.atoz.vn/ww2/module.tintuc.asp?id=35281&sl=3&pageid=1`
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Ý Kiến Khách Hàng
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {comments &&
          comments.map((comment) =>
            comment.data.map((db) => (
              <div
                key={db.id}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={
                        db.hinhdaidien
                          ? db.hinhdaidien
                          : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                      }
                      alt={db.tieude}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">
                      {db.tieude}
                    </p>
                    <p className="text-sm text-gray-500">{db.ngaydang}</p>
                  </div>
                </div>
                <div
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: db.noidungtomtat }}
                />
              </div>
            ))
          )}
      </div>
    </div>
  );
}
