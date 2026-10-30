import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import emailRecipientApi from "../../services/emailRecipientApi";

export const fetchEmailRecipients = createAsyncThunk(
  "emailRecipient/fetchEmailRecipients",
  async ({ page = 1, limit = 10, search } = {}, { getState, rejectWithValue }) => {
    try {
      const q = search !== undefined ? search : getState().emailRecipient.searchText;
      const res = await emailRecipientApi.getAll({ page, limit, search: q });
      return {
        list: res.data || [],
        pagination: res.pagination || null,
      };
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message ||
          "Không tải được danh sách người nhận email. Kiểm tra lại backend.",
      });
    }
  }
);

export const createEmailRecipient = createAsyncThunk(
  "emailRecipient/createEmailRecipient",
  async ({ payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await emailRecipientApi.add(payload);
      await dispatch(fetchEmailRecipients(refetch));
      toast.success("Thêm mới người nhận email thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi thêm mới người nhận email.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const updateEmailRecipient = createAsyncThunk(
  "emailRecipient/updateEmailRecipient",
  async ({ id, payload, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await emailRecipientApi.update(id, payload);
      await dispatch(fetchEmailRecipients(refetch));
      toast.success("Cập nhật người nhận email thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi cập nhật người nhận email.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

export const deleteEmailRecipient = createAsyncThunk(
  "emailRecipient/deleteEmailRecipient",
  async ({ id, refetch }, { dispatch, rejectWithValue }) => {
    try {
      await emailRecipientApi.delete(id);
      await dispatch(fetchEmailRecipients(refetch));
      toast.success("Xóa người nhận email thành công.");
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Có lỗi xảy ra khi xóa người nhận email.";
      toast.error(msg);
      return rejectWithValue({ message: msg });
    }
  }
);

const emailRecipientSlice = createSlice({
  name: "emailRecipient",
  initialState: {
    list: [],
    pagination: null,
    status: "idle",
    error: "",
    searchText: "",
  },
  reducers: {
    setEmailRecipientSearchText: (state, action) => {
      state.searchText = action.payload ?? "";
    },
    clearEmailRecipientError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailRecipients.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchEmailRecipients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.list;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEmailRecipients.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          "Không tải được danh sách người nhận email. Kiểm tra lại backend.";
        toast.error("Không tải được danh sách người nhận email.");
      })

      .addCase(createEmailRecipient.rejected, (state, action) => {
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateEmailRecipient.rejected, (state, action) => {
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteEmailRecipient.rejected, (state, action) => {
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setEmailRecipientSearchText, clearEmailRecipientError } =
  emailRecipientSlice.actions;
export default emailRecipientSlice.reducer;
