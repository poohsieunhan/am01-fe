import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import emailConfigApi from "../../services/emailConfigApi";

export const fetchEmailConfigs = createAsyncThunk(
  "emailConfig/fetchEmailConfigs",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await emailConfigApi.getAll({ page, limit });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được cấu hình email. Kiểm tra lại backend.",
      });
    }
  }
);

export const createEmailConfig = createAsyncThunk(
  "emailConfig/createEmailConfig",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await emailConfigApi.add(payload);
      await dispatch(fetchEmailConfigs(refetch));
      toast.success("Thêm mới cấu hình email thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi thêm mới cấu hình email.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateEmailConfig = createAsyncThunk(
  "emailConfig/updateEmailConfig",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await emailConfigApi.update(id, payload);
      await dispatch(fetchEmailConfigs(refetch));
      toast.success("Cập nhật cấu hình email thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi cập nhật cấu hình email.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteEmailConfig = createAsyncThunk(
  "emailConfig/deleteEmailConfig",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await emailConfigApi.delete(id);
      await dispatch(fetchEmailConfigs(refetch));
      toast.success("Xóa cấu hình email thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa cấu hình email.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const emailConfigSlice = createSlice({
  name: "emailConfig",
  initialState: {
    list: [],
    pagination: null,
    status: "idle",
    error: "",
    searchText: "",
  },
  reducers: {
    setEmailConfigSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearEmailConfigError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailConfigs.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchEmailConfigs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEmailConfigs.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được cấu hình email. Kiểm tra lại backend.";
        toast.error("Không tải được cấu hình email.");
      })

      .addCase(createEmailConfig.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateEmailConfig.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteEmailConfig.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setEmailConfigSearchText, clearEmailConfigError } =
  emailConfigSlice.actions;
export default emailConfigSlice.reducer;
