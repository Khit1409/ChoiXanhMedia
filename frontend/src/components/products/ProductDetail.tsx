"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { AppDispatch, RootState } from "@/redux/store";
import {
  addToCart,
  addToWishList,
  getProductDetail,
  handleOder,
} from "@/slices/productSlice";
import { decodeHtml, reNameInfo } from "@/redux/utils";

import ModelAlert from "../tools/ModelAlert";
import ProductContainer from "./ProductContainer";
import SpinAnimation from "../items/SpinAnimation";

export default function ProductDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { productDetail, oderResult } = useSelector(
    (state: RootState) => state.products
  );
  const { users, loggedIn } = useSelector((state: RootState) => state.auths);
  const userid = users?.userid;
  const pass = users?.pass;

  const [mainImg, setMainImg] = useState<string | null>(null);
  const [imgList, setImgList] = useState<string[]>([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const [wlLoading, setWlLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [oderLoading, setOderLoading] = useState(false);
  const [model, setModel] = useState<boolean>(false);

  // Slideshow logic
  useEffect(() => {
    if (imgList.length === 0) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % imgList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imgList]);

  useEffect(() => {
    if (imgList.length > 0) setMainImg(imgList[imgIndex]);
  }, [imgIndex, imgList]);

  // Fetch product detail
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

  // Handler: Add to Cart
  const handleAddToCart = async () => {
    if (!loggedIn) return router.push("/dang-nhap");
    try {
      setModel(false);
      setCartLoading(true);
      const result = await dispatch(
        addToCart({ userid: userid!, pass: pass!, id })
      );
      if (addToCart.fulfilled.match(result)) setModel(true);
    } finally {
      setCartLoading(false);
    }
  };

  // Handler: Add to Wishlist
  const handleAddToWishList = async () => {
    if (!loggedIn) return router.push("/dang-nhap");
    try {
      setModel(false);
      setWlLoading(true);
      const result = await dispatch(
        addToWishList({ userid: userid!, pass: pass!, id })
      );
      if (addToWishList.fulfilled.match(result)) setModel(true);
    } finally {
      setWlLoading(false);
    }
  };

  // Handler: Place Order
  const oder = async () => {
    try {
      setModel(false);
      setOderLoading(true);
      await dispatch(handleOder({ userid: userid!, pass: pass! }));
      if (oderResult?.some((od) => od.maloi === "1")) setModel(true);
    } finally {
      setOderLoading(false);
    }
  };
  return (
    <div className="container pt-2">
      {model && <ModelAlert setModel={setModel} />}
      {productDetail ? (
        productDetail.map((products, idx) => (
          <div key={idx}>
            {/* Product Info */}
            <div className="row mb-5">
              {/* Left: Image Gallery */}
              <div className="col-md-6 mb-4">
                <div className="p-3 shadow-sm">
                  <div className="text-center mb-3">
                    {mainImg && (
                      <Image
                        src={mainImg}
                        alt="Main Product"
                        width={300}
                        height={300}
                        className="img-fluid"
                      />
                    )}
                  </div>
                  <h5 className="border-bottom pb-2">Tổng quan sản phẩm</h5>
                  <div className="row g-3 gap-1 mt-2">
                    {products.images.map((imgs, groupIndex) =>
                      imgs.data.map((img, imgIndex) => (
                        <div
                          key={`w3thumb-${groupIndex}-${imgIndex}`}
                          className="border p-1"
                          style={{
                            cursor: "pointer",
                            inlineSize: "100px",
                            blockSize: "100px",
                          }}
                          onClick={() => {
                            setImgIndex(imgIndex);
                            setMainImg(img.hinhdaidien);
                          }}
                        >
                          <Image
                            src={img.hinhdaidien}
                            alt="Thumbnail"
                            width={100}
                            height={100}
                            className="img-fluid"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="col-md-6 productInfo">
                <div className="p-4">
                  {products.info.map((info) => (
                    <div key={info.id}>
                      <p className="fs-5">
                        <strong>{info.tieude?.toUpperCase()}</strong>
                      </p>
                      <p className="mb-3">
                        <strong>Mã sản phẩm:</strong> {id}
                      </p>
                      <p className="mb-3">
                        <strong>Giá:</strong> {info.gia - info.giakhuyenmai} VND
                      </p>
                      {Object.entries(info).map(([name, value]) => {
                        if (["hinhlienquan"].includes(name)) return null;
                        if (Array.isArray(value)) {
                          return (
                            <p className="mb-3" key={`attr-${info.id}-${name}`}>
                              <strong className="me-1">
                                {reNameInfo(name)}:
                              </strong>
                              {value.map((vl, i) =>
                                vl?.tengoi && vl?.url ? (
                                  <a
                                    key={`val-${info.id}-${name}-${i}`}
                                    className="text-cyan-600 underline"
                                    href={vl.url}
                                  >
                                    {vl.tengoi}
                                  </a>
                                ) : null
                              )}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 mb-4">
                    <button
                      className="btn border rounded-0 border-2 border-success"
                      onClick={handleAddToCart}
                    >
                      {cartLoading ? <SpinAnimation /> : "Thêm vào giỏ hàng"}
                    </button>
                    <button
                      className="btn btn-success rounded-0"
                      onClick={handleAddToWishList}
                    >
                      {wlLoading ? (
                        <SpinAnimation />
                      ) : (
                        <>
                          Yêu thích <FontAwesomeIcon icon={faHeart} />
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-success rounded-0"
                      onClick={oder}
                    >
                      {oderLoading ? <SpinAnimation /> : "MUA NGAY"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white p-3 border position-relative productDescription">
              {products.info.map((descs) => (
                <div key={`desc-${descs.id}`}>
                  <p className="text-muted mb-2">Lượt xem: {descs.luotxem}</p>
                  <div
                    className={`transition-all overflow-hidden ${
                      expanded ? "" : "text-truncate"
                    }`}
                    style={{ maxBlockSize: expanded ? "100%" : "300px" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(descs.noidungchitiet),
                      }}
                    />
                  </div>
                  {!expanded && (
                    <div
                      className="position-absolute bottom-0 start-0 w-100"
                      style={{
                        blockSize: "60px",
                        background:
                          "linear-gradient(to top, white, transparent)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Toggle Description */}
            <div className="text-center mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "Ẩn bớt" : "Xem thêm"}
              </button>
            </div>

            {/* Related Products */}
            <div>
              <ProductContainer />
            </div>
          </div>
        ))
      ) : (
        <div className="d-flex align-items-center justify-content-center container min-vh-100">
          <SpinAnimation />
        </div>
      )}
    </div>
  );
}
