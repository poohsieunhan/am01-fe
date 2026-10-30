import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/userApi";

// Lấy user đã lưu trong localStorage nếu có
const savedUser = (() => {
  try {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

export const login = createAsyncThunk(
  "auth/login",
  async ({ LoginName, Password }, { rejectWithValue }) => {
    try {
      const data = await userApi.login({ LoginName, Password });
      // data: { Id, LoginName, Role }
      localStorage.setItem("authUser", JSON.stringify(data));
      return data;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  user: savedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("authUser");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đăng nhập thất bại";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
