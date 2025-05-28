import { UsersSate, initialState } from "@/types/authType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const auhtApiUrl = process.env.NEXT_PUBLIC_SERVER_API;

//authenticated
export const checkAuth = createAsyncThunk<
  UsersSate,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${auhtApiUrl}/me`, {
      withCredentials: true,
    });
    if (response.data.resultCode == 1) {
      return response.data.users;
    } else return thunkAPI.rejectWithValue("lỗi không tìm thấy token");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi get");
    }
    return thunkAPI.rejectWithValue("Chưa đăng nhập hoặc token hết hạn");
  }
});
//login page
export const login = createAsyncThunk<
  number,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${auhtApiUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data.resultCode;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkAPI.rejectWithValue("Đăng nhập thất bại");
  }
});
//register
export const register = createAsyncThunk<
  number,
  {
    name: string;
    email: string;
    password: string;
    roles: string;
    phone: string;
    avatar: string;
    birthday: Date;
  },
  { rejectValue: string }
>(
  "auth/register",
  async (
    { password, roles, phone, avatar, email, name, birthday },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/dang-ky", {
        password,
        roles,
        phone,
        name,
        email,
        avatar,
        birthday,
      });
      return res.data.resultCode;
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue("Đăng ký thất bại");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định!!!");
  }
);
//logout
export const logout = createAsyncThunk<number, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${auhtApiUrl}/logout`,
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
//slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // checkauth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      //login
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
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.loggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload || "Lỗi đăng nhập";
      })
      //register
      .addCase(register.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
