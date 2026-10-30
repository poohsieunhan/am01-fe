import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import accountApi from "../../services/accountApi";

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async ({ page = 1, limit = 10, search } = {}, { getState, rejectWithValue }) => {
    try {
      const q = search !== undefined ? search : getState().account.searchText;
      const res = await accountApi.getAll({ page, limit, search: q });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách tài khoản. Kiểm tra lại backend.",
      });
    }
  }
);

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await accountApi.add(payload);
      await dispatch(fetchAccounts(refetch));
      toast.success("Thêm mới tài khoản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi thêm mới tài khoản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await accountApi.update(id, payload);
      await dispatch(fetchAccounts(refetch));
      toast.success("Cập nhật tài khoản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật tài khoản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await accountApi.delete(id);
      await dispatch(fetchAccounts(refetch));
      toast.success("Xóa tài khoản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa tài khoản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    list: [],
    pagination: null,
    status: "idle",
    error: "",
    searchText: "",
  },
  reducers: {
    setAccountSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearAccountError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách tài khoản. Kiểm tra lại backend.";
        toast.error("Không tải được danh sách tài khoản.");
      })

      .addCase(createAccount.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setAccountSearchText, clearAccountError } = accountSlice.actions;
export default accountSlice.reducer;
