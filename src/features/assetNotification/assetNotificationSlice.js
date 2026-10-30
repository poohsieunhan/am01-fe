import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import assetNotificationApi from "../../services/assetNotificationApi";

export const fetchAssetNotifications = createAsyncThunk(
  "assetNotification/fetchAssetNotifications",
  async ({ page = 1, limit = 10, search = "" } = {}, { rejectWithValue }) => {
    try {
      const res = await assetNotificationApi.getAll({ page, limit, search });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách cảnh báo tài sản.",
      });
    }
  }
);

export const createAssetNotification = createAsyncThunk(
  "assetNotification/createAssetNotification",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetNotificationApi.add(payload);
      await dispatch(fetchAssetNotifications(refetch));
      toast.success("Thêm mới cảnh báo tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi thêm mới cảnh báo.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateAssetNotification = createAsyncThunk(
  "assetNotification/updateAssetNotification",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetNotificationApi.update(id, payload);
      await dispatch(fetchAssetNotifications(refetch));
      toast.success("Cập nhật cảnh báo tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật cảnh báo.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteAssetNotification = createAsyncThunk(
  "assetNotification/deleteAssetNotification",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetNotificationApi.delete(id);
      await dispatch(fetchAssetNotifications(refetch));
      toast.success("Xóa cảnh báo tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa cảnh báo.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const assetNotificationSlice = createSlice({
  name: "assetNotification",
  initialState: {
    list: [],
    pagination: null,
    status: "idle",
    error: "",
    searchText: "",
  },
  reducers: {
    setAssetNotificationSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearAssetNotificationError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetNotifications.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAssetNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAssetNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách cảnh báo tài sản.";
        toast.error("Không tải được danh sách cảnh báo tài sản.");
      })

      .addCase(createAssetNotification.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateAssetNotification.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteAssetNotification.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const {
  setAssetNotificationSearchText,
  clearAssetNotificationError,
} = assetNotificationSlice.actions;
export default assetNotificationSlice.reducer;
