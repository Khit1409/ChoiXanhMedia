import axios from "axios";
import { Request, Response } from "express";

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
      menuProducts: "",
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy hoặc lưu dữ liệu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
//lấy sản phẩm chi tiết
export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [imgRes, infoRes] = await Promise.all([
      axios.get(
        `https://choixanh.com.vn/ww2/tinhnang.hinhanh.idpart.asp?id=${id}`
      ),
      axios.get(
        `https://choixanh.com.vn/ww2/module.sanpham.chitiet.asp?id=${id}`
      ),
    ]);
    //gộp
    const products = [
      {
        images: imgRes.data,
        info: infoRes.data,
      },
    ];
    // response data
    return res.status(200).json({
      message: "Sản phẩm chi tiết",
      products: products,
    });
  } catch (error) {
    console.error("Lỗi getProductDetail:", error);
    return res
      .status(500)
      .json({ message: "Không thể lấy thông tin sản phẩm" });
  }
};

//thêm giỏ hàng
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userid = req.query.userid;
    const id = req.query.id;
    const pass = req.query.pass;

    //check
    console.log("id:", id, "userid:", userid, "pass:", pass);
    //call api
    const result = await axios.post(
      `https://choixanh.com.vn/ww1/save.addcart.asp?userid=${userid}&pass=${pass}&id=${id}`
    );
    console.log(
      "Gọi tới URL:",
      `https://choixanh.com.vn/ww1/save.addcart.asp?userid=${userid}&pass=${pass}&id=${id}`
    );

    if (result.data) {
      const mess = Number(result.data[0]?.maloi);
      console.log("ma tra ve:", mess);
      if (mess == 1) {
        return res.status(200).json({ message: "Thành công", results: 1 });
      } else {
        return res.status(400).json({ message: "Thất bại", results: 0 });
      }
    }
  } catch (error) {
    return res.status(404).json({ message: "Lỗi server!" });
  }
};
