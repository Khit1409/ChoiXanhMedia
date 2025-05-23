import axios from "axios";
import { Request, Response } from "express";

export interface DataProductResponse {
  id: string;
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
  data: Array<DataProduct>;
}

export interface DataProduct {
  id?: string;
  tieude?: string;
  gia?: number;
  giakhuyenmai?: number;
  ngaydang?: string;
  hinhdaidien?: string;
  hinhanh?: Array<{
    id: string;
    hinhdaidien: string;
    tieude: string;
  }>;
  [name: string]: unknown;
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
//thêm yêu thích
export const addToWishList = async (req: Request, res: Response) => {
  try {
    // get  userid id pass from request
    const id = req.body.id;
    const userid = req.body.userid;
    const pass = req.body.pass;

    console.log("userid", userid, "pass", pass, "id", id);

    //send request to api url
    const sendReq = await axios.post(
      `https://choixanh.com.vn/ww1/save.wishlist.asp?userid=${userid}&pass=${pass}&id=${id}`
    );
    console.log("kết quả trả về:", sendReq.data);
    const sendReqResponse = sendReq.data.map((res: any) => res.maloi);
    //check repsonse from sendReq
    const errorCode = sendReqResponse[0];
    console.log("mã lỗi:", errorCode);
    if (errorCode === "1" || errorCode == 1) {
      const products = await axios.get(
        ` https://choixanh.com.vn/ww2/module.sanpham.chitiet.asp?id=${id}`
      );
      const product = products.data;

      // const model = new Cart({ product });
      // await model.save();

      return res.status(200).json({
        message: "Thêm sản phẩm vào yêu thích thành công!",
        product,
        result: 1,
      });
    } else {
      return res.status(500).json({
        message: "Lỗi không thể thêm sản phẩm, mã lỗi trả về từ api:",
        error: 0,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "Lỗi server", error: -1 });
  }
};
//thêm giỏ hàng
export const addToCart = async (req: Request, res: Response) => {
  try {
    // get  userid id pass from request
    const id = req.body.id;
    const userid = req.body.userid;
    const pass = req.body.pass;

    console.log("userid", userid, "pass", pass, "id", id,"thêm giỏ hàng");

    //send request to api url
    const sendReq = await axios.post(
      `https://choixanh.com.vn/ww1/save.addcart.asp?userid=${userid}&pass=${pass}&id=${id}`
    );
    console.log("kết quả trả về:", sendReq.data);
    const sendReqResponse = sendReq.data.map((res: any) => res.maloi);
    //check repsonse from sendReq
    const errorCode = sendReqResponse[0];
    console.log("mã lỗi:", errorCode);
    if (errorCode === "1" || errorCode == 1) {
      const products = await axios.get(
        ` https://choixanh.com.vn/ww2/module.sanpham.chitiet.asp?id=${id}`
      );
      const product = products.data;

      // const model = new Cart({ product });
      // await model.save();

      return res.status(200).json({
        message: "Thêm sản phẩm vào giỏ hàng thành công!",
        product,
        result: 1,
      });
    } else {
      return res.status(500).json({
        message: "Lỗi không thể thêm sản phẩm, mã lỗi trả về từ api:",
        error: 0,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "Lỗi server", error: -1 });
  }
};
