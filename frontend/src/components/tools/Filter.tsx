import axios from "axios";
import React, { useEffect, useState } from "react";

interface FilterMaster {
  id: string;
  idquanly: number;
  danhmuc: string;
  idxuly: string;
  tieude: string;
  chonnhieu: boolean;
  chophep: boolean;
  url: string;
}

interface FilterMasterDetail {
  ten: string;
  ma: string;
  thamso: Array<{
    tengoi: string;
    ma: string;
    url: string;
  }>;
}

export default function Filter() {
  const [filterMasterDetail, setFilterMasterDetail] = useState<
    FilterMasterDetail[]
  >([]);

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const res = await axios.get(
          "https://choixanh.com.vn/ww2/crm.boloc.master.asp"
        );
        if (res.data) {
          const details = await Promise.all(
            res.data.map((filter: FilterMaster) =>
              axios.get(
                `https://choixanh.com.vn/ww2/crm.boloc.chitiet.asp?id=${filter.id}`
              )
            )
          );

          const all = details.flatMap((detail) => detail.data);
          setFilterMasterDetail(all);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilter();
  }, []);

  return (
    <div className="my-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Bộ lọc sản phẩm
      </h2>
      {filterMasterDetail &&
        filterMasterDetail.map((items) => (
          <div
            key={items.ten}
            className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
          >
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {items.ten}
            </p>
            <ul className="flex flex-wrap gap-2">
              {items.thamso &&
                items.thamso.map((ts) => (
                  <li key={ts.ma}>
                    <a
                      href={ts.url}
                      className="inline-block bg-green-100 hover:bg-green-200 text-green-800 font-medium py-1 px-3 rounded-full transition-all duration-200"
                    >
                      {ts.tengoi}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
