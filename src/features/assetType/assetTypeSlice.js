import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import assetTypeApi from "../../services/assetTypeApi";

// GET list asset types with server pagination
export const fetchAssetTypes = createAsyncThunk(
  "assetType/fetchAssetTypes",
  async ({ page = 1, limit = 10, search } = {}, { getState, rejectWithValue }) => {
    try {
      const q = search !== undefined ? search : getState().assetType.searchText;
      const res = await assetTypeApi.getAll({ page, limit, search: q });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách loại tài sản. Kiểm tra lại backend.",
      });
    }
  }
);

export const createAssetType = createAsyncThunk(
  "assetType/createAssetType",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetTypeApi.add(payload);
      await dispatch(fetchAssetTypes(refetch));
      toast.success("Thêm mới loại tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi thêm mới loại tài sản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateAssetType = createAsyncThunk(
  "assetType/updateAssetType",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetTypeApi.update(id, payload);
      await dispatch(fetchAssetTypes(refetch));
      toast.success("Cập nhật loại tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi cập nhật loại tài sản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteAssetType = createAsyncThunk(
  "assetType/deleteAssetType",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await assetTypeApi.delete(id);
      await dispatch(fetchAssetTypes(refetch));
      toast.success("Xóa loại tài sản thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa loại tài sản.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const assetTypeSlice = createSlice({
  name: "assetType",
  initialState: {
    list: [],
    pagination: null,
    status: "idle", // idle | loading | succeeded | failed
    error: "",
    searchText: "",
  },
  reducers: {
    setAssetTypeSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearAssetTypeError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetTypes.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAssetTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAssetTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách loại tài sản. Kiểm tra lại backend.";
        toast.error("Không tải được danh sách loại tài sản.");
      })

      .addCase(createAssetType.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateAssetType.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteAssetType.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setAssetTypeSearchText, clearAssetTypeError } =
  assetTypeSlice.actions;
export default assetTypeSlice.reducer;
