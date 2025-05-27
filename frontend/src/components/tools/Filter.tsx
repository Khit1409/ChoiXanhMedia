import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SpinAnimation from "../items/SpinAnimation";

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

  // boostrap function
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function initScrollSpy() {
      if (!scrollRef.current) return;
      const { ScrollSpy } = await import("bootstrap");
      new ScrollSpy(scrollRef.current, {
        target: "#navbar-example2",
        rootMargin: "0px 0px -40%",
        smoothScroll: true,
      });
    }
    initScrollSpy();
  }, []);

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
    <div className="py-4 px-3 my-3 container">
      <div
        tabIndex={0}
        className="mb-4 p-3 border border-secondary overflow-y-scroll positon-relative"
        style={{
          height: "400px",
          overflowY: "auto",
        }}
        ref={scrollRef}
      >
        {filterMasterDetail && filterMasterDetail.length > 0 ? (
          filterMasterDetail.map((items) => (
            <div key={`${items.ma}-${items.thamso}`}>
              <p className="h5 fw-semibold mb-2">{items.ten}</p>
              <ul className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 list-unstyled">
                {items.thamso.map((ts) => (
                  <li key={ts.tengoi} className="col">
                    <a
                      href={ts.url}
                      className="text-decoration-none text-primary"
                    >
                      {ts.tengoi}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <SpinAnimation />
        )}
      </div>
    </div>
  );
}
