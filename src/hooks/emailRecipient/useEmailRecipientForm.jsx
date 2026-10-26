import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmailRecipient,
  deleteEmailRecipient,
  updateEmailRecipient,
} from "../../features/emailRecipient/emailRecipientSlice";
import { selectEmailRecipientPagination } from "../../features/emailRecipient/emailRecipientSelectors";

function initialForm() {
  return {
    Name: "",
    Email: "",
    Active: true,
  };
}

export function useEmailRecipientForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectEmailRecipientPagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedRecipient(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (recipient) => {
    setMode("edit");
    setSelectedRecipient(recipient);
    setFormData({
      Name: recipient.Name || "",
      Email: recipient.Email || "",
      Active: Boolean(recipient.Active),
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (recipient) => {
    setMode("delete");
    setSelectedRecipient(recipient);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedRecipient(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (mode !== "delete") {
        if (!formData.Name.trim()) {
          setFormError("Tên người nhận là bắt buộc.");
          return;
        }
        if (!formData.Email.trim()) {
          setFormError("Địa chỉ email là bắt buộc.");
          return;
        }
      }

      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
      };

      const payload = {
        Name: formData.Name.trim(),
        Email: formData.Email.trim(),
        Active: Boolean(formData.Active),
      };

      if (mode === "create") {
        const action = await dispatch(
          createEmailRecipient({ payload, refetch })
        );
        if (!createEmailRecipient.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateEmailRecipient({ id: selectedRecipient.Id, payload, refetch })
        );
        if (!updateEmailRecipient.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteEmailRecipient({ id: selectedRecipient.Id, refetch })
        );
        if (!deleteEmailRecipient.fulfilled.match(action)) {
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
    selectedRecipient,
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
