import express from "express";
import { checkAuth, login, logout } from "../controllers/authController";

const authrouter = express.Router();

//đăng nhập
authrouter.post("/login", async (req, res) => {
  await login(req, res);
});
//check trạng thái đăng nhập
authrouter.get("/check", async (req, res) => {
  await checkAuth(req, res);
});
//đăng xuất
authrouter.post("/logout", async (req, res) => {
  await logout(req, res);
});
export default authrouter;
