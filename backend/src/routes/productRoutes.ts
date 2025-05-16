import express from "express";
import {
  getAllProduct,
  getAllProductByUrl,
} from "../controllers/productController";

const productroutes = express.Router();

// Lấy toàn bộ sản phẩm
productroutes.get("/:producturl", async (req, res) => {
  await getAllProductByUrl(req, res);
});
productroutes.get("/", async (req, res) => {
  await getAllProduct(req, res);
});

// Lấy dữ liệu sản phẩm từ API ngoài để crawl (dùng thử nghiệm)
export default productroutes;
