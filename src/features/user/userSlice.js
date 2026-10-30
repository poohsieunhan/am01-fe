import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import userApi from "../../services/userApi";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ page = 1, limit = 10, search } = {}, { getState, rejectWithValue }) => {
    try {
      const q = search !== undefined ? search : getState().user.searchText;
      const res = await userApi.getAll({ page, limit, search: q });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách người dùng. Kiểm tra lại backend.",
      });
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await userApi.add(payload);
      await dispatch(fetchUsers(refetch));
      toast.success("Thêm mới người dùng thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi thêm mới người dùng.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await userApi.update(id, payload);
      await dispatch(fetchUsers(refetch));
      toast.success("Cập nhật người dùng thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi cập nhật người dùng.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await userApi.delete(id);
      await dispatch(fetchUsers(refetch));
      toast.success("Xóa người dùng thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa người dùng.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    pagination: null,
    status: "idle",
    error: "",
    searchText: "",
  },
  reducers: {
    setUserSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearUserError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách người dùng. Kiểm tra lại backend.";
        toast.error("Không tải được danh sách người dùng.");
      })

      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setUserSearchText, clearUserError } = userSlice.actions;
export default userSlice.reducer;
