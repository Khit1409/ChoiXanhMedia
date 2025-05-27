import {
  AddCartResponse,
  DataProductResponse,
  initialState,
  OrderState,
  ProductDetail,
} from "@/types/productTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productApiUrl = process.env.NEXT_PUBLIC_PRODUCT_API;

// Async thunk to fetch product data
export const getAllProduct = createAsyncThunk<
  DataProductResponse[],
  void,
  { rejectValue: string }
>("product/get-all", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${productApiUrl}`);
    if (res.data.products) {
      const products = res.data.products;
      return products;
    }
    return thunkAPI.rejectWithValue("Không có dữ liệu sản phẩm");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Không thể lấy danh sách sản phẩm"
      );
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định!");
  }
});
// fetch product detail
export const getProductDetail = createAsyncThunk<
  ProductDetail[],
  { id: string },
  { rejectValue: string }
>("product/detail", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.get(`${productApiUrl}/chi-tiet/${id}`);
    if (response.data) {
      return response.data.products;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi axios!");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định");
  }
});
// add to cart function
export const addToCart = createAsyncThunk<
  AddCartResponse[],
  { userid: string; pass: string; id: string },
  { rejectValue: string }
>("product/addcart", async ({ userid, pass, id }, thunkAPI) => {
  try {
    // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
    const response = await axios.post(`${productApiUrl}/them-gio-hang`, {
      userid,
      pass,
      id,
    });

    const responseCode = response.data.result;
    const newCart = response.data.product;

    if (responseCode == 1 || responseCode === "1") {
      // session
      const currentCart = JSON.parse(sessionStorage.getItem("cart") || "[]");

      // Thêm sản phẩm mới vào giỏ hàng hiện tại
      if (Array.isArray(newCart)) {
        currentCart.push(...newCart);
      } else {
        currentCart.push(newCart);
      }

      // Lưu lại vào sessionStorage
      sessionStorage.setItem("cart", JSON.stringify(currentCart));

      //payload
      return response.data.product;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi axios post!");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định, có thể do server");
  }
});
// add to wishlist function
export const addToWishList = createAsyncThunk<
  AddCartResponse[],
  { userid: string; pass: string; id: string },
  { rejectValue: string }
>("product/wishlist", async ({ userid, pass, id }, thunkAPI) => {
  try {
    // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
    const response = await axios.post(`${productApiUrl}/them-wishlist`, {
      userid,
      pass,
      id,
    });

    const responseCode = response.data.result;
    const newWishList = response.data.product;

    if (responseCode == 1 || responseCode === "1") {
      // session
      const currentWL = JSON.parse(sessionStorage.getItem("wishList") || "[]");

      // Thêm sản phẩm mới vào giỏ hàng hiện tại
      if (Array.isArray(newWishList)) {
        currentWL.push(...newWishList);
      } else {
        currentWL.push(newWishList);
      }

      // Lưu lại vào sessionStorage
      sessionStorage.setItem("wishList", JSON.stringify(currentWL));

      //payload
      return response.data.product;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi axios post!");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định, có thể do server");
  }
});
//Buy

export const handleOder = createAsyncThunk<
  OrderState[],
  { userid: string; pass: string },
  { rejectValue: string }
>("product/buy", async ({ userid, pass }, thunkAPI) => {
  try {
    const response = await axios.post(
      `https://choixanh.com.vn/ww1/save.cart.asp?userid=${userid}&pass=${pass}&id=`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Error request");
    }
    return thunkAPI.rejectWithValue("Lỗi server");
  }
});
//slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // lấy tất cả sản phẩm
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.menu = state.products.map((item) => {
          return { tieude: item.tieude, url: item.url };
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi";
        state.loading = false;
      })
      // lấy sản phẩm chi tiết
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.loading = false;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      //thêm vào giỏ hàng
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addcart = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addcart = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //add wish list
      .addCase(addToWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      //mua sản phẩm
      .addCase(handleOder.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleOder.fulfilled, (state, action) => {
        state.oderResult = action.payload;
        state.loading = false;
      })
      .addCase(handleOder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Buy error";
      });
  },
});

export default productSlice.reducer;
