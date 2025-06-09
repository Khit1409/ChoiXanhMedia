import { CustomNavbar, CustomState, initialState } from "@/types/customType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------ Async Thunks ------------------------

// Lấy danh mục trang cho navbar
export const getPageCategories = createAsyncThunk<
  CustomNavbar[],
  void,
  { rejectValue: string }
>("page/category", async (_, thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:8000/api/get-category-page");
    if (res.data) {
      return res.data.custom;
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Lỗi khi lấy danh mục trang");
  }
});

// Lấy SEO tùy chỉnh theo trang
export const fetchCustom = createAsyncThunk<
  CustomState[],
  { id: number; type: string },
  { rejectValue: string }
>("page/custom", async ({ id, type }, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/custom-page?id=${id}&type=${type}`
    );
    return response.data.seo;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi truy cập server");
    }
    return thunkAPI.rejectWithValue("Lỗi server");
  }
});

//get Custom logo

export const getCustomLogo = createAsyncThunk<
  {
    id: string;
    name: string;
    src: string;
    padding: string;
    border_radius: string;
    margin: string;
    width: string;
    height: string;
    created_at: Date;
    update_at: Date;
  }[],
  void,
  { rejectValue: string }
>("get/logo", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/get-custom-logo`
    );
    if (response.data) {
      return response.data.logo;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
// ------------------------ Slice ------------------------

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openResponsiveMenu: (state, action) => {
      state.responsiveMenu = action.payload;
    },
    handleOpenUserMenu: (state, action) => {
      state.openMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Lấy danh mục trang
      .addCase(getPageCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPageCategories.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(getPageCategories.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // Lấy SEO tùy chỉnh
      .addCase(fetchCustom.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustom.fulfilled, (state, action) => {
        state.custom = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustom.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      //lấy logo
      .addCase(getCustomLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomLogo.fulfilled, (state, action) => {
        state.logo = action.payload;
        state.loading = false;
      })
      .addCase(getCustomLogo.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
export const { openResponsiveMenu, handleOpenUserMenu } = menuSlice.actions;
