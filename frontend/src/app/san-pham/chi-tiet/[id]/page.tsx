"use client";

import { handleAddToCart } from "@/api/onclickApi";
import { getProductDetail } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { decodeHtml } from "@/redux/utils";
import { faCartPlus, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetail() {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const { productDetail } = useSelector((state: RootState) => state.products);
  const { decoded } = useSelector((state: RootState) => state.auths);
  //
  const userid = decoded?.users.userid;
  const pass = decoded?.users.pass;
  //
  const [mainImg, setMainImg] = useState<string | null>(null);
  const [imgList, setImgList] = useState<string[]>([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // Auto change image
  useEffect(() => {
    if (imgList.length === 0) return;
    const interval = setInterval(() => {
      setImgIndex((prevIndex) => (prevIndex + 1) % imgList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imgList]);

  // Update mainImg when imgIndex changes
  useEffect(() => {
    if (imgList.length > 0) {
      setMainImg(imgList[imgIndex]);
    }
  }, [imgIndex, imgList]);

  // Get product data
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await dispatch(getProductDetail({ id }));
        if (getProductDetail.fulfilled.match(response)) {
          const imgs = response.payload[0]?.images[0]?.data || [];
          const imgUrls = imgs.map((img) => img.hinhdaidien);
          setImgList(imgUrls);
          if (imgUrls.length > 0) {
            setMainImg(imgUrls[0]);
            setImgIndex(0);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetail();
  }, [dispatch, id]);

  return (
    <div className="flex flex-col mt-5 gap-10 px-5 md:py-6 py-10">
      {/* Ảnh và nút mua */}
      {productDetail ? (
        productDetail.map((products) => (
          <div
            key={Math.random()}
            className="flex justify-around md:flex-row flex-col gap-2"
          >
            {/* ảnh */}
            <div className="md:w-1/2 flex flex-col gap-3 p-4 shadow-lg">
              <div className="rounded items-center overflow-hidden justify-center mb-4 flex">
                {mainImg && (
                  <Image
                    width={750}
                    height={500}
                    src={mainImg}
                    alt="Main Product"
                    className="object-cover shadow-md p-2"
                  />
                )}
              </div>

              {/* Thumbnail */}
              <strong className="border-b">Tổng quan sản phẩm</strong>
              <div className="grid grid-cols-6 gap-2 overflow-x-auto justify-center">
                {products.images.map((imgs) =>
                  imgs.data.map((img, index) => (
                    <div
                      key={img.id}
                      className="cursor-pointer border border-gray-300 p-1 rounded hover:border-blue-500"
                      onClick={() => {
                        setImgIndex(index);
                        setMainImg(img.hinhdaidien);
                      }}
                    >
                      <Image
                        src={img.hinhdaidien}
                        alt="Thumbnail"
                        width={100}
                        height={100}
                        className="object-contain w-[100px] h-[100px]"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* thong tin */}
            <div className="md:w-1/2 flex flex-col gap-3 p-4 shadow-lg">
              {/* nut mua va mo ta san pham */}
              <div className="w-full flex-col items-center">
                <p className="text-center">
                  <strong>Mã sản phẩm:</strong> {id}
                </p>
                <div className="flex rounded text-white font-bold justify-center">
                  <button className="bg-green-500 px-2 py-3 rounded-l hover:bg-green-400">
                    <FontAwesomeIcon icon={faShoppingBag} className="mx-2" />
                    Mua
                  </button>
                  <button className="bg-blue-500 px-2 py-3 rounded-r hover:bg-blue-400">
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="mx-2"
                      onClick={() =>
                        handleAddToCart(`${id}`, `${userid}`, `${pass}`)
                      }
                    />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              {/* Nội dung mô tả chi tiết */}
              <div className="relative bg-white rounded-xl p-4 shadow">
                {productDetail &&
                  productDetail.map((products) =>
                    products.info.map((descs) => (
                      <div key={descs.id}>
                        <p className="font-medium text-gray-600 mb-2">
                          Lượt xem: {descs.luotxem}
                        </p>

                        <div
                          className={`relative transition-all duration-500 ${
                            expanded
                              ? "max-h-full"
                              : "max-h-[300px] overflow-hidden"
                          }`}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: decodeHtml(descs.noidungchitiet),
                            }}
                          />

                          {!expanded && (
                            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                          )}
                        </div>

                        <div className="text-center mt-4">
                          <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className="border-gray-600 border text-gray-500 px-4 py-1 rounded hover:bg-gray-400 text-sm"
                          >
                            {expanded ? "Ẩn bớt" : "Xem thêm"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl">KHÔNG LOAD ĐƯỢC SẢN PHẨM</p>
        </div>
      )}
    </div>
  );
}
