import axios from "axios";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
interface LoginResponse {
  ThongBao: string;
  maloi: number;
  memberid: string;
  user: string;
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
    const data = response.data as LoginResponse[];

    if (
      data.map((db) => {
        db.ThongBao === "Đăng nhập thành công";
      })
    ) {
      const member = data.map((db) => db.chucnang);
      //mã hóa mật khẩu
      const hashPass = crypto.createHash("md5").update(pass).digest("hex");

      const token = jwt.sign(
        { userid, pass: hashPass, member },
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
          results: "thanh cong",
          users: {
            userid,
            pass: hashPass,
          },
          token,
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

    const { userid, pass, member } = decoded;
    console.log("userid:", userid, "pass:", pass, "member:", member);

    //lấy user menu
    const menu = await axios.get(
      `https://choixanh.com.vn/ww1/member.${member}.asp?userid=${userid}&pass=${pass}`
    );
    const menuRes = menu.data as MenuUser[];
    console.log(menuRes);

    if (!userid || !pass) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    // trả về kết quả
    return res.status(200).json({
      message: "Token hợp lệ",
      users: { userid, pass },
      token,
      menu: menuRes,
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
    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    return res.status(500).json({ message: "Đăng xuất thất bại", error });
  }
};
