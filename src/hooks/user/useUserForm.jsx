import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../features/user/userSlice";
import { selectUserPagination } from "../../features/user/userSelectors";

function initialForm() {
  return {
    LoginName: "",
    Password: "",
    Role: "1",
  };
}

export function useUserForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectUserPagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedUser(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (user) => {
    setMode("edit");
    setSelectedUser(user);
    setFormData({
      LoginName: user.LoginName || "",
      Password: "",
      Role: user.Role != null ? String(user.Role) : "1",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (user) => {
    setMode("delete");
    setSelectedUser(user);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (mode !== "delete") {
        if (!formData.LoginName.trim()) {
          setFormError("Tên đăng nhập (LoginName) là bắt buộc.");
          return;
        }
        if (mode === "create" && !formData.Password.trim()) {
          setFormError("Mật khẩu là bắt buộc khi tạo mới.");
          return;
        }
      }

      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
      };

      const payload = {
        LoginName: formData.LoginName.trim(),
        Role: Number(formData.Role) || 1,
      };
      if (formData.Password) {
        payload.Password = formData.Password.trim();
      }

      if (mode === "create") {
        const action = await dispatch(createUser({ payload, refetch }));
        if (!createUser.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateUser({ id: selectedUser.Id, payload, refetch })
        );
        if (!updateUser.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteUser({ id: selectedUser.Id, refetch })
        );
        if (!deleteUser.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Xóa thất bại.");
          return;
        }
      }

      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  return {
    open,
    mode,
    selectedUser,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  };
}
