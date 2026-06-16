import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import companyApi from "../../services/companyApi";

// GET list companies with server pagination.
export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await companyApi.getAll({ page, limit });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách công ty. Kiểm tra lại backend.",
      });
    }
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await companyApi.add(payload);
      await dispatch(fetchCompanies(refetch));
      toast.success("Thêm mới công ty thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi thêm mới công ty.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await companyApi.update(id, payload);
      await dispatch(fetchCompanies(refetch));
      toast.success("Cập nhật công ty thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật công ty.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await companyApi.delete(id);
      await dispatch(fetchCompanies(refetch));
      toast.success("Xóa công ty thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa công ty.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    list: [],
    pagination: null,
    status: "idle", // idle | loading | succeeded | failed
    error: "",
    searchText: "",
  },
  reducers: {
    setCompanySearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearCompanyError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách công ty. Kiểm tra lại backend.";
        toast.error("Không tải được danh sách công ty.");
      })

      .addCase(createCompany.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setCompanySearchText, clearCompanyError } = companySlice.actions;
export default companySlice.reducer;
