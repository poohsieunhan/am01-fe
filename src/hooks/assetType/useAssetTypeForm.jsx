import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAssetType,
  deleteAssetType,
  updateAssetType,
} from "../../features/assetType/assetTypeSlice";
import { selectAssetTypePagination } from "../../features/assetType/assetTypeSelectors";

function initialForm() {
  return {
    Code: "",
    Name: "",
    HasExpire: false,
  };
}

export function useAssetTypeForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectAssetTypePagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedAssetType, setSelectedAssetType] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedAssetType(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (assetType) => {
    setMode("edit");
    setSelectedAssetType(assetType);
    setFormData({
      Code: assetType.Code || "",
      Name: assetType.Name || "",
      HasExpire: Boolean(assetType.HasExpire),
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (assetType) => {
    setMode("delete");
    setSelectedAssetType(assetType);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedAssetType(null);
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
        if (!formData.Code.trim()) {
          setFormError("Mã loại tài sản là bắt buộc.");
          return;
        }

        if (!formData.Name.trim()) {
          setFormError("Tên loại tài sản là bắt buộc.");
          return;
        }
      }

      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
      };

      const payload = {
        Code: formData.Code.trim(),
        Name: formData.Name.trim(),
        HasExpire: Boolean(formData.HasExpire),
      };

      if (mode === "create") {
        const action = await dispatch(createAssetType({ payload, refetch }));
        if (!createAssetType.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateAssetType({ id: selectedAssetType.Id, payload, refetch })
        );
        if (!updateAssetType.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteAssetType({ id: selectedAssetType.Id, refetch })
        );
        if (!deleteAssetType.fulfilled.match(action)) {
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
    selectedAssetType,
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
