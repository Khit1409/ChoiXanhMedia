import express from "express";
import {
  addToCart,
  getAllProduct,
  getProductDetail,
} from "../controllers/productController";

const productroutes = express.Router();

//lấy sản phẩm chi tiết
productroutes.get("/chi-tiet/:id", async (req, res) => {
  await getProductDetail(req, res);
});
productroutes.post("/them-gio-hang", async (req, res) => {
  await addToCart(req, res);
});
// Lấy toàn bộ sản phẩm
productroutes.get("/", async (req, res) => {
  await getAllProduct(req, res);
});

// Lấy dữ liệu sản phẩm từ API ngoài để crawl (dùng thử nghiệm)
export default productroutes;
