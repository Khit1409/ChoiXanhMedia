import axios from "axios";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
interface ResponseAPI {
  ThongBao: string;
  maloi: number;
  memberid: string;
  user: string;
  email: string;
  chucnang: string;
}
interface MenuUser {
  id: string;
  tieude: string;
  url: string;
  module: string;
  tenham: string;
}
//đăng nhập
export const login = async (req: Request, res: Response) => {
  const userid = req.body.userid;
  const pass = req.body.pass;
  try {
    const response = await axios.post(
      `https://choixanh.com.vn/ww1/userlogin.asp?userid=${userid}&pass=${pass}`
    );
    const data = response.data as ResponseAPI[];
    //kiểm tra thông báo trả về...
    const loginSuccess = data.some(
      (db) => db.ThongBao === "Đăng nhập thành công"
    );
    if (loginSuccess) {
      //mã hóa mật khẩu
      const hashPass = crypto.createHash("md5").update(pass).digest("hex");

      const token = jwt.sign(
        { userid, pass: hashPass, member: 0 },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: "ĐĂNG NHẬP THÀNH CÔNG",
          resultCode: 1,
        });
    } else {
      return res.status(401).json({ message: "Đăng nhập thất bại" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Lỗi khi đăng nhập", error });
  }
};
//check auth
export const checkAuth = async (req: Request, res: Response) => {
  try {
    // params
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Chưa đăng nhập hoặc hết phiên" });
    }
    //dịch token
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as jwt.JwtPayload;

    const { userid, pass } = decoded;

    if (!userid || !pass) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    // trả về kết quả
    return res.status(200).json({
      message: "Token hợp lệ",
      users: { userid, pass },
      token,
      resultCode: 1,
    });
  } catch (error) {
    return res.status(401).json({ message: "Token hết hạn hoặc lỗi", error });
  }
};

//logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ message: "Đăng xuất thành công", resultCode: 1 });
  } catch (error) {
    return res.status(500).json({ message: "Đăng xuất thất bại", error });
  }
};

//Đăng ký

export const register = async (req: Request, res: Response) => {
  try {
    //khai bao
    const id2 = req.body.id2;
    const loaithanhvien = req.body.loaithanhvien;
    const tenkh = req.body.tenkh;
    const email = req.body.email;
    const tel = req.body.tel;
    const userid = req.body.userid;
    const pass = req.body.pass;
    // gọi api
    const response = await axios.post(
      `https://choixanh.com.vn/ww1/userlogin.asp?id2=${id2}&loaithanhvien=${loaithanhvien}&tenkh=${tenkh}&email=${email}&tel=${tel}&userid=${userid}&pass=${pass}`
    );
    // trả về kết quả
    if (response.data) {
      const results: ResponseAPI[] = response.data;
      const message = results.map((rs) => rs.ThongBao);
      const mess = message[0];
      if (
        mess ===
        "Tài khoản chưa kích hoạt, vui lòng làm theo hướng dẫn trong email"
      ) {
        return res
          .status(200)
          .json({ message: "Thông báo", kq: mess, resultCode: 1 });
      } else {
        return res
          .status(500)
          .json({ message: "Thông báo", kq: mess, resultCode: 0 });
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "Lỗi server!!!" });
  }
};
