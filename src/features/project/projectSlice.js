import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import projectApi from "../../services/projectApi";

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await projectApi.getAll({ page, limit });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách dự án. Kiểm tra lại backend.",
      });
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await projectApi.add(payload);
      await dispatch(fetchProjects(refetch));
      toast.success("Thêm mới dự án thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi thêm mới dự án.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await projectApi.update(id, payload);
      await dispatch(fetchProjects(refetch));
      toast.success("Cập nhật dự án thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật dự án.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await projectApi.delete(id);
      await dispatch(fetchProjects(refetch));
      toast.success("Xóa dự án thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa dự án.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    list: [],
    pagination: null,
    status: "idle",
    error: "",
    searchText: "",
  },
  reducers: {
    setProjectSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearProjectError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách dự án. Kiểm tra lại backend.";
        toast.error("Không tải được danh sách dự án.");
      })

      .addCase(createProject.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setProjectSearchText, clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
