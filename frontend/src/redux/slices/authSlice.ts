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
    return response.data as Decoded;
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
    return response.data.users;
  } catch (error) {
    if (axios.isAxiosError(error))
      return thunkAPI.rejectWithValue("Đăng nhập thất bại");
  }
});

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
        state.loading = false;
        state.loggedIn = true;
        state.decoded = action.payload;
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
        state.loggedIn = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload || "Lỗi đăng nhập";
      });
  },
});

export default authSlice.reducer;
