import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productroutes from "./src/routes/productRoutes";
import authrouter from "./src/routes/authRoutes";
import cookieParser from "cookie-parser";
// import connectDB from "./src/db/db";
dotenv.config();

const app = express();

// database connect
// connectDB();

// Cấu hình CORS
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

//
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/san-pham", productroutes);
app.use("/api/auth", authrouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});
