import axios from "axios";
import { Request, Response } from "express";
import { toSlug } from "../utils/utils";
interface ProductState {
  module: string;
  tenham: string;
  tieude: string;
  url: string;
  metatitle: string;
  metakeywords: string;
  metadescriptions: string;
  kieu: string;
  recordsTotal: number;
  recordsFiltered: number;
  data: [[Object]];
}
//lấy tất cả sản phẩm
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const urls = [
      process.env.COMPUTER_URL,
      process.env.TABLE_URL,
      process.env.TIVI_URL,
      process.env.MAY_LANH_URL,
      process.env.SMART_PHONE_URL,
    ];

    // Gọi
    const responses = await Promise.all(
      urls.map((url) => axios.get(url as string))
    );

    // Gộp
    const allProducts = responses.flatMap((res) => res.data);
    // Lưu
    return res.status(200).json({
      message: "Đã lưu sản phẩm thành công",
      products: allProducts,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy hoặc lưu dữ liệu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
//lấy tất cả sản phẩm có url = url
export const getAllProductByUrl = async (req: Request, res: Response) => {
  try {
    const producturl = req.params.producturl;

    const urls = [
      process.env.COMPUTER_URL,
      process.env.TABLE_URL,
      process.env.TIVI_URL,
      process.env.MAY_LANH_URL,
      process.env.SMART_PHONE_URL,
    ];

    // Gọi tất cả URL
    const responses = await Promise.all(
      urls.map((url) => axios.get(url as string))
    );

    // Gộp danh mục sản phẩm
    const allProducts = responses.flatMap((res) => res.data) as ProductState[];

    // Tìm danh mục có slug khớp
    const matchedCategory = allProducts.filter(
      (item) => toSlug(item.tieude) === producturl
    );
    if (!matchedCategory) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy danh mục sản phẩm" });
    }
    // Trả về nguyên object gồm tieude, data, metatitle, ...
    return res.status(200).json({
      product: matchedCategory,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy hoặc lưu dữ liệu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
