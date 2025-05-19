import {
  DataProductResponse,
  initialState,
  ProductDetail,
} from "@/types/productTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch product data
export const getAllProduct = createAsyncThunk<
  DataProductResponse[],
  void,
  { rejectValue: string }
>("product/get-all", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/san-pham`);
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
// lấy sản phẩm chi tiết
export const getProductDetail = createAsyncThunk<
  ProductDetail[],
  { id: string },
  { rejectValue: string }
>("product/detail", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/san-pham/chi-tiet/${id}`
    );
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
//slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default productSlice.reducer;
