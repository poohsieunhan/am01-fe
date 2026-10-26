import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import assetTypeNotificationApi from "../../services/assetTypeNotificationApi";

export const fetchAssetTypeNotifications = createAsyncThunk(
  "assetTypeNotification/fetchAssetTypeNotifications",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await assetTypeNotificationApi.getAll({ page, limit });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách cảnh báo loại tài sản.",
      });
    }
  }
);

export const createAssetTypeNotification = createAsyncThunk(
  "assetTypeNotification/createAssetTypeNotification",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetTypeNotificationApi.add(payload);
      await dispatch(fetchAssetTypeNotifications(refetch));
      toast.success("Thêm mới cảnh báo loại tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi thêm mới cảnh báo.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateAssetTypeNotification = createAsyncThunk(
  "assetTypeNotification/updateAssetTypeNotification",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetTypeNotificationApi.update(id, payload);
      await dispatch(fetchAssetTypeNotifications(refetch));
      toast.success("Cập nhật cảnh báo loại tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật cảnh báo.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteAssetTypeNotification = createAsyncThunk(
  "assetTypeNotification/deleteAssetTypeNotification",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetTypeNotificationApi.delete(id);
      await dispatch(fetchAssetTypeNotifications(refetch));
      toast.success("Xóa cảnh báo loại tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa cảnh báo.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const assetTypeNotificationSlice = createSlice({
  name: "assetTypeNotification",
  initialState: {
    list: [],
    pagination: null,
    status: "idle",
    error: "",
    searchText: "",
  },
  reducers: {
    setAssetTypeNotificationSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearAssetTypeNotificationError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetTypeNotifications.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAssetTypeNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAssetTypeNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách cảnh báo loại tài sản.";
        toast.error("Không tải được danh sách cảnh báo loại tài sản.");
      })

      .addCase(createAssetTypeNotification.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateAssetTypeNotification.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteAssetTypeNotification.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const {
  setAssetTypeNotificationSearchText,
  clearAssetTypeNotificationError,
} = assetTypeNotificationSlice.actions;
export default assetTypeNotificationSlice.reducer;
