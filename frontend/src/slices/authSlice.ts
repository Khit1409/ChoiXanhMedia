import { Decoded, LoginResponse, initialState } from "@/types/authType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const auhtApiUrl = process.env.NEXT_PUBLIC_AUTH_API;

//authenticated
export const checkAuth = createAsyncThunk<
  Decoded,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/check`, {
      withCredentials: true,
    });
    if (response.data.token) {
      return response.data as Decoded;
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
  LoginResponse,
  { userid: string; pass: string },
  { rejectValue: string }
>("auth/login", async ({ userid, pass }, thunkAPI) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/login`,
      { userid, pass },
      { withCredentials: true }
    );
    if (response.data.users || response.data.token) {
      return response.data.users;
    } else return thunkAPI.rejectWithValue("Lỗi đăng nhập");
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkAPI.rejectWithValue("Đăng nhập thất bại");
  }
});
//register
export const register = createAsyncThunk<
  number,
  {
    id2: string;
    userid: string;
    loaithanhvien: string;
    tenkh: string;
    tel: string;
    email: string;
    pass: string;
  },
  { rejectValue: string }
>(
  "auth/register",
  async ({ id2, userid, loaithanhvien, tenkh, tel, email, pass }, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/dang-ky", {
        id2,
        userid,
        loaithanhvien,
        tenkh,
        tel,
        email,
        pass,
      });
      if (res.data.code) {
        return res.data.code;
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        return thunkAPI.rejectWithValue("Đăng ký thất bại");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định!!!");
  }
);
//logout
export const logout = createAsyncThunk<string, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${auhtApiUrl}/logout`,
        {},
        { withCredentials: true }
      );
      if (response.data) {
        return response.data.message;
      }
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
        state.decoded = action.payload;
        state.loggedIn = true;
        // lưu lên ss
        sessionStorage.setItem("loggedIn", "true");
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.decoded = null;
        state.error = action.payload as string;
      })
      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.loggedIn = true;
        state.error = null;
        state.mess = "Đăng nhập thành công";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload || "Lỗi đăng nhập";
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.mess = action.payload;
        state.loggedIn = false;
        state.decoded = null;
        state.users = null;
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
        state.successCode = 0;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.successCode = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
