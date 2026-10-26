import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from "../../features/account/accountSlice";
import { selectAccountPagination } from "../../features/account/accountSelectors";

function initialForm() {
  return {
    Name: "",
    Username: "",
    Password: "",
  };
}

export function useAccountForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectAccountPagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedAccount(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (account) => {
    setMode("edit");
    setSelectedAccount(account);
    setFormData({
      Name: account.Name || "",
      Username: account.Username || "",
      Password: "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (account) => {
    setMode("delete");
    setSelectedAccount(account);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedAccount(null);
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
        if (!formData.Name.trim()) {
          setFormError("Tên hiển thị là bắt buộc.");
          return;
        }
        if (!formData.Username.trim()) {
          setFormError("Tên đăng nhập là bắt buộc.");
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
        Name: formData.Name.trim(),
        Username: formData.Username.trim(),
      };
      if (formData.Password) {
        payload.Password = formData.Password.trim();
      }

      if (mode === "create") {
        const action = await dispatch(createAccount({ payload, refetch }));
        if (!createAccount.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateAccount({ id: selectedAccount.Id, payload, refetch })
        );
        if (!updateAccount.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteAccount({ id: selectedAccount.Id, refetch })
        );
        if (!deleteAccount.fulfilled.match(action)) {
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
    selectedAccount,
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
