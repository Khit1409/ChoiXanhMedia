import { initialState, UsersSate } from "@/types/authType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authApiUrl = process.env.NEXT_PUBLIC_SERVER_API;

// ------------------------ Async Thunks ------------------------

// Kiểm tra đăng nhập
export const checkAuth = createAsyncThunk<
  UsersSate,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${authApiUrl}/check`, {
      withCredentials: true,
    });
    if (response.data.resultCode == 1) {
      return response.data.user;
    } else {
      return thunkAPI.rejectWithValue("Lỗi không tìm thấy token");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi get");
    }
    return thunkAPI.rejectWithValue("Chưa đăng nhập hoặc token hết hạn");
  }
});

// Đăng nhập
export const login = createAsyncThunk<
  number,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${authApiUrl}/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );
    return response.data.resultCode;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Đăng nhập thất bại");
    }
  }
});

// Đăng ký
export const register = createAsyncThunk<
  { resultCode: number; message: string },
  {
    name: string;
    email: string;
    password: string;
    roles: string;
    phone: string;
    avatar: string;
    gender: string;
  },
  { rejectValue: { resultCode: number; message: string } }
>(
  "auth/register",
  async ({ password, roles, phone, avatar, email, name, gender }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${authApiUrl}/register`,
        {
          password,
          roles,
          phone,
          name,
          email,
          avatar,
          gender,
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          resultCode: 0,
          message: "Đăng ký thất bại",
        });
      }
      return thunkAPI.rejectWithValue({
        resultCode: 0,
        message: "SERVER ERROR",
      });
    }
  }
);

// Đăng xuất
export const logout = createAsyncThunk<number, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${authApiUrl}/logout`,
        {},
        { withCredentials: true }
      );
      return response.data.resultCode;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue("Lỗi post!");
      }
      return thunkAPI.rejectWithValue("Lỗi hệ thống không xác định");
    }
  }
);

// ------------------------ Slice ------------------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Kiểm tra đăng nhập
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Đăng nhập
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi đăng nhập";
      })

      // Đăng xuất
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.loggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload || "Lỗi đăng xuất";
      })

      // Đăng ký
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.resultCode = action.payload.resultCode;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.resultCode = action.payload?.resultCode;
        state.error = action.payload?.message;
      });
  },
});

export default authSlice.reducer;
