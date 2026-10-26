import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import assetApi from "../../services/assetApi";

// GET list assets with server pagination
export const fetchAssets = createAsyncThunk(
  "asset/fetchAssets",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await assetApi.getAll({ page, limit });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách tài sản. Kiểm tra lại backend.",
      });
    }
  }
);

export const createAsset = createAsyncThunk(
  "asset/createAsset",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetApi.add(payload);
      await dispatch(fetchAssets(refetch));
      toast.success("Thêm mới tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi thêm mới tài sản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateAsset = createAsyncThunk(
  "asset/updateAsset",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetApi.update(id, payload);
      await dispatch(fetchAssets(refetch));
      toast.success("Cập nhật tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật tài sản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteAsset = createAsyncThunk(
  "asset/deleteAsset",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetApi.delete(id);
      await dispatch(fetchAssets(refetch));
      toast.success("Xóa tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa tài sản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const assetSlice = createSlice({
  name: "asset",
  initialState: {
    list: [],
    pagination: null,
    status: "idle", // idle | loading | succeeded | failed
    error: "",
    searchText: "",
  },
  reducers: {
    setAssetSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearAssetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách tài sản. Kiểm tra lại backend.";
        toast.error("Không tải được danh sách tài sản.");
      })

      .addCase(createAsset.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setAssetSearchText, clearAssetError } = assetSlice.actions;
export default assetSlice.reducer;
