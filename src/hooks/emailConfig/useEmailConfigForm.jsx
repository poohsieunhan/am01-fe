import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmailConfig,
  deleteEmailConfig,
  updateEmailConfig,
} from "../../features/emailConfig/emailConfigSlice";
import { selectEmailConfigPagination } from "../../features/emailConfig/emailConfigSelectors";

function initialForm() {
  return {
    Provider: "",
    Host: "",
    Port: "587",
    Secure: "TLS",
    Username: "",
    Password: "",
    FromEmail: "",
    FromName: "",
    Active: true,
  };
}

export function useEmailConfigForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectEmailConfigPagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedConfig(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (config) => {
    setMode("edit");
    setSelectedConfig(config);
    setFormData({
      Provider: config.Provider || "",
      Host: config.Host || "",
      Port: config.Port || "587",
      Secure: config.Secure || "TLS",
      Username: config.Username || "",
      Password: config.Password || "",
      FromEmail: config.FromEmail || "",
      FromName: config.FromName || "",
      Active: Boolean(config.Active),
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (config) => {
    setMode("delete");
    setSelectedConfig(config);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedConfig(null);
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
        if (!formData.Provider.trim()) {
          setFormError("Nhà cung cấp là bắt buộc.");
          return;
        }
        if (!formData.Host.trim()) {
          setFormError("Host máy chủ là bắt buộc.");
          return;
        }
        if (!formData.Port.trim()) {
          setFormError("Port là bắt buộc.");
          return;
        }
        if (!formData.Secure.trim()) {
          setFormError("Cấu hình Secure là bắt buộc.");
          return;
        }
        if (!formData.FromEmail.trim()) {
          setFormError("Email gửi là bắt buộc.");
          return;
        }
        if (!formData.FromName.trim()) {
          setFormError("Tên người gửi là bắt buộc.");
          return;
        }
      }

      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
      };

      const payload = {
        Provider: formData.Provider.trim(),
        Host: formData.Host.trim(),
        Port: formData.Port.trim(),
        Secure: formData.Secure.trim(),
        Username: formData.Username.trim(),
        Password: formData.Password.trim(),
        FromEmail: formData.FromEmail.trim(),
        FromName: formData.FromName.trim(),
        Active: Boolean(formData.Active),
      };

      if (mode === "create") {
        const action = await dispatch(createEmailConfig({ payload, refetch }));
        if (!createEmailConfig.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateEmailConfig({ id: selectedConfig.Id, payload, refetch })
        );
        if (!updateEmailConfig.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteEmailConfig({ id: selectedConfig.Id, refetch })
        );
        if (!deleteEmailConfig.fulfilled.match(action)) {
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
    selectedConfig,
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
