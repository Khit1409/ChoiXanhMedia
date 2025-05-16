import { DataProductResponse } from "@/types/productTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Menu {
  tieude: string;
  url: string;
}

interface ProductState {
  products: DataProductResponse[] | DataProductResponse | null;
  menu: Menu[] | null;
  loading: boolean;
  product: DataProductResponse[] | null;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  product: null,
  menu: null,
  loading: false,
  error: null,
};

// Async thunk to fetch product data
export const getAllProduct = createAsyncThunk<
  DataProductResponse[],
  void,
  { rejectValue: string }
>("product/get-all", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/san-pham`);
    if (res.data) {
      return res.data.products;
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

// lấy sản phẩm cho trang riêng
export const getProductByUrl = createAsyncThunk<
  DataProductResponse[],
  { producturl: string },
  { rejectValue: string }
>("product/get-by-url", async ({ producturl }, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/san-pham/${producturl}`
    );
    if (response.data) {
      return response.data.product;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi axios");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định");
  }
});
// lấy sản phẩm chi tiết

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
      .addCase(getProductByUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByUrl.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProductByUrl.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "Lỗi";
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
