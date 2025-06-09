"use client";

import { getProductDetail } from "@/redux/slices/page.content.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//#region INTERFACES
interface NomarlReq {
  name: string;
  price: number;
  sale: number;
  description: string;
  category_filter_url: string;
  img: string;
  filter_keyword: string;
}
interface Info {
  name: string;
  productInfoValue: InfoValue[];
}
interface InfoValue {
  value: string;
}
interface Thumbnail {
  name: string;
  src: string;
}
//#endregion

export default function ManagerProductDetaill() {
  const dispatch = useDispatch<AppDispatch>();
  const { productDetail } = useSelector((state: RootState) => state.products);
  const paramId = useSearchParams();
  const id = paramId.get("id");

  useEffect(() => {
    dispatch(getProductDetail({ id: Number(id) }));
  }, []);
  //#region STATE: Thông tin sản phẩm cơ bản
  const [req, setReq] = useState<NomarlReq>({
    name: "",
    price: 0,
    sale: 0,
    description: "",
    category_filter_url: "",
    img: "",
    filter_keyword: "",
  });

  const handleOnchangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReq({
      ...req,
      [name]: value,
    });
  };
  //#endregion

  //#region STATE: Thông tin chi tiết
  const [info, setInfo] = useState<Info[]>([]);
  const [infoName, setInfoName] = useState("");
  const [infoVal, setInfoVal] = useState("");

  const handleAddInfoValue = () => {
    if (!infoName.trim() || !infoVal.trim()) return;

    setInfo((prevInfo) => {
      const existing = prevInfo.find((i) => i.name === infoName.trim());

      if (existing) {
        const updated = prevInfo.map((i) =>
          i.name === infoName.trim()
            ? {
                ...i,
                productInfoValue: [
                  ...i.productInfoValue,
                  { value: infoVal.trim() },
                ],
              }
            : i
        );
        sessionStorage.setItem("productInfo", JSON.stringify(updated));
        return updated;
      } else {
        const updated = [
          ...prevInfo,
          {
            name: infoName.trim(),
            productInfoValue: [{ value: infoVal.trim() }],
          },
        ];
        sessionStorage.setItem("productInfo", JSON.stringify(updated));
        return updated;
      }
    });

    setInfoVal("");
  };
  //#endregion

  //#region STATE: Thumbnail
  const [productThumbnail, setProductThumbnail] = useState<Thumbnail[]>([]);
  const [thumbnailInput, setThumbnailInput] = useState("");
  const handleAddThumbnail = () => {
    if (!thumbnailInput.trim()) return;
    const updated = [
      ...(productThumbnail || []),
      { name: `thumb-${Date.now()}`, src: thumbnailInput },
    ];
    setProductThumbnail(updated);
    sessionStorage.setItem("productThumbnail", JSON.stringify(updated));
    setThumbnailInput("");
  };
  //#endregion

  //#region INIT EFFECT
  useEffect(() => {
    const savedInfo = sessionStorage.getItem("productInfo");
    if (savedInfo) setInfo(JSON.parse(savedInfo));

    const savedThumbnail = sessionStorage.getItem("productThumbnail");
    if (savedThumbnail) setProductThumbnail(JSON.parse(savedThumbnail));
  }, [dispatch]);
  //#endregion

  //#region SUBMIT FORM
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:8000/api/update-product`,
        {
          name: req.name,
          filter_keyword: req.filter_keyword,
          description: req.description,
          img: req.img,
          id: Number(id),
          price: Number(req.price),
          sale: Number(req.sale),
          productInfo: info,
          thumbnails: productThumbnail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.data.resultCode == 1) {
        alert("Thành công");
        sessionStorage.removeItem("productInfo");
        sessionStorage.removeItem("productThumbnail");
      }
    } catch (error) {
      sessionStorage.removeItem("productInfo");
      sessionStorage.removeItem("productThumbnail");
      console.log("Lỗi:", error);
    }
  };
  //#endregion
  //#region JSX RETURN
  return (
    <div className="container-fluid py-4">
      <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
        {/* THÔNG TIN SẢN PHẨM */}
        <div className="border p-3 rounded bg-white">
          <h4 className="text-center mb-3">SỬA THÔNG TIN SẢN PHẨM</h4>
          <div className="row row-cols-1 g-3">
            {productDetail?.map((detail) =>
              [
                { label: "Tên sản phẩm", name: "name", oldValue: detail.name },
                {
                  label: "Mô tả",
                  name: "description",
                  oldValue: detail.description,
                },
                {
                  label: "Từ khóa tìm kiếm",
                  name: "filter_keyword",
                  oldValue: detail.filter_keyword,
                },
                {
                  label: "Giá",
                  name: "price",
                  type: "number",
                  oldValue: detail.price,
                },
                {
                  label: "Giá khuyến mãi",
                  name: "sale",
                  type: "number",
                  oldValue: detail.sale,
                },
                {
                  label: "Ảnh đại diện sản phẩm",
                  name: "img",
                  oldValue: detail.img,
                },
              ].map(({ label, name, type, oldValue }) => (
                <div className="col" key={name}>
                  <label className="form-label">{label}</label>
                  <p className="text-secondary">{oldValue}</p>
                  <input
                    name={name}
                    type={type || "text"}
                    value={req[name as keyof NomarlReq]}
                    className="form-control rounded-0"
                    placeholder="Giá trị mới"
                    onChange={handleOnchangeFormData}
                  />
                </div>
              ))
            )}
            {/* ẢNH CHI TIẾT */}
            <div className="col">
              <label className="form-label">Ảnh chi tiết sản phẩm</label>
              <input
                type="text"
                className="form-control rounded-0"
                value={thumbnailInput}
                onChange={(e) => setThumbnailInput(e.target.value)}
              />
              <ul className="mt-2">
                {productThumbnail?.map((thumb, index) => (
                  <li key={index}>{thumb.src}</li>
                ))}
              </ul>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleAddThumbnail}
                  className="btn btn-outline-success btn-sm"
                >
                  Thêm ảnh
                </button>
              </div>
            </div>
          </div>

          {/* THÔNG TIN CHI TIẾT */}
          <hr className="my-4" />
          <h5 className="text-center mb-3">Thông tin chi tiết</h5>
          <div className="row row-cols-1 g-3">
            <div className="col">
              <label className="form-label">Tên thông tin</label>
              <input
                type="text"
                value={infoName}
                onChange={(e) => setInfoName(e.target.value)}
                className="form-control rounded-0"
                placeholder="Tên thông tin sản phẩm"
              />
            </div>

            <div className="col">
              <label className="form-label">Giá trị</label>
              <input
                type="text"
                value={infoVal}
                onChange={(e) => setInfoVal(e.target.value)}
                className="form-control rounded-0"
                placeholder="Giá trị thông tin"
              />
            </div>

            <div className="text-center mt-2">
              <button
                type="button"
                onClick={handleAddInfoValue}
                className="btn btn-outline-success btn-sm"
              >
                Thêm giá trị
              </button>
            </div>
            <p className="text-success">
              *Để thêm thông tin bạn cần nhập tên thông tin, sau đó nhập giá trị
              nhấn nút thêm giá trị (có thể thêm nhiều giá trị), nếu muốn nhập
              thêm thông tin xóa tên thông tin cũ nhập tên thông tin mới và làm
              lại các bước như trên.
            </p>
          </div>

          <ul className="mt-3">
            {info.map((i, idx) => (
              <li key={idx}>
                <strong>{i.name}:</strong>{" "}
                {i.productInfoValue.map((v, vi) => (
                  <span key={vi} className="badge bg-secondary me-1">
                    {v.value}
                  </span>
                ))}
              </li>
            ))}
          </ul>

          <div className="text-center mt-4">
            <button className="btn btn-success" type="submit">
              <FontAwesomeIcon icon={faSave} className="me-2" />
              Lưu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  //#endregion
}
