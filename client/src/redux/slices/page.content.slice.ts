import {
  CreateProductReq,
  blogsState,
  ProductDetail,
  ProductsCategories,
  initialState,
  CreateBlogRequest,
  blogs,
} from "@/types/content.page.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productApiUrl = process.env.NEXT_PUBLIC_SERVER_API;

// ------------------------ Async Thunks ------------------------

// Lấy danh sách sản phẩm
export const getProduct = createAsyncThunk<
  ProductsCategories[],
  { id: number },
  { rejectValue: string }
>("product/get-all", async ({ id }, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product?id=${id}`);
    return res.data.product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Không thể lấy danh sách sản phẩm"
      );
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định!");
  }
});

// Lấy chi tiết sản phẩm
export const getProductDetail = createAsyncThunk<
  ProductDetail[],
  { id: number },
  { rejectValue: string }
>("product/get-detail", async ({ id }, thunkAPI) => {
  try {
    const res = await axios.get(`${productApiUrl}/product-detail/${id}`);
    return res.data.product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Không thể lấy danh sách sản phẩm"
      );
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định!");
  }
});

// Lấy danh sách bài viết
export const getBlog = createAsyncThunk<
  blogsState[],
  { id: number },
  { rejectValue: string }
>("blog/getAll", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.get(`${productApiUrl}/blog?id=${id}`);
    return response.data.blog;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi http");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định");
  }
});

// Lấy chi tiết bài viết
export const getBlogDetail = createAsyncThunk<
  blogs[],
  { id: number },
  { rejectValue: string }
>("blog/get-detail", async ({ id }, thunkAPI) => {
  try {
    const res = await axios.get(`${productApiUrl}/blog-detail/${id}`);
    return res.data.blog;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Không thể lấy danh sách bài viết"
      );
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định!");
  }
});

// Tạo sản phẩm mới
export const createProduct = createAsyncThunk<
  number,
  CreateProductReq,
  { rejectValue: string }
>("product/create", async (CreateProductReq, thunkAPI) => {
  try {
    const response = await axios.post(
      `${productApiUrl}/product/create-product`,
      CreateProductReq,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.resultCode;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
    return thunkAPI.rejectWithValue(`Server Error!`);
  }
});

// Tạo bài viết mới
export const createBlog = createAsyncThunk<
  number,
  CreateBlogRequest,
  { rejectValue: string }
>("page/newblog", async (CreateBlogRequest, thunkAPI) => {
  try {
    const response = await axios.post(
      `${productApiUrl}/new-blog`,
      {
        CreateBlogRequest,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.resultCode;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Lỗi rồi thằng đằn");
  }
});

// ------------------------ Slice ------------------------

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Lấy tất cả sản phẩm
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // Lấy bài viết
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Tạo mới sản phẩm
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.resultCode = action.payload;
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // Lấy chi tiết sản phẩm
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Tạo bài viết
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.resultCode = action.payload;
        state.loading = false;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // Lấy chi tiết bài viết
      .addCase(getBlogDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogDetail.fulfilled, (state, action) => {
        state.blogDetail = action.payload;
        state.loading = false;
      })
      .addCase(getBlogDetail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
