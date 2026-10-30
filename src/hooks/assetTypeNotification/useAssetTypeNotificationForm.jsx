import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAssetTypeNotification,
  deleteAssetTypeNotification,
  updateAssetTypeNotification,
} from "../../features/assetTypeNotification/assetTypeNotificationSlice";
import {
  selectAssetTypeNotificationPagination,
  selectAssetTypeNotificationSearchText,
} from "../../features/assetTypeNotification/assetTypeNotificationSelectors";
import assetTypeApi from "../../services/assetTypeApi";

function initialForm() {
  return {
    AssetTypeId: "1",
    NotifyBeforeDays: "30",
    NotifyOnExpire: true,
    Active: true,
  };
}

export function useAssetTypeNotificationForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectAssetTypeNotificationPagination);
  const searchText = useSelector(selectAssetTypeNotificationSearchText);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);

  useEffect(() => {
    assetTypeApi
      .getAll({ page: 1, limit: 100 })
      .then((res) => {
        const list = res?.data || [];
        const opts = list.map((t) => ({
          value: String(t.Id),
          label: `${t.Name} (${t.Code || t.Id})`,
        }));
        setAssetTypeOptions(opts);
        if (opts.length > 0) {
          setFormData((prev) => ({
            ...prev,
            AssetTypeId: prev.AssetTypeId || opts[0].value,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const openCreate = () => {
    setMode("create");
    setSelectedItem(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (item) => {
    setMode("edit");
    setSelectedItem(item);
    setFormData({
      AssetTypeId: item.AssetTypeId != null ? String(item.AssetTypeId) : "1",
      NotifyBeforeDays:
        item.NotifyBeforeDays != null ? String(item.NotifyBeforeDays) : "30",
      NotifyOnExpire: Boolean(item.NotifyOnExpire),
      Active: Boolean(item.Active),
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (item) => {
    setMode("delete");
    setSelectedItem(item);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedItem(null);
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
        if (!formData.AssetTypeId) {
          setFormError("AssetType ID là bắt buộc.");
          return;
        }
        if (!formData.NotifyBeforeDays) {
          setFormError("Số ngày báo trước là bắt buộc.");
          return;
        }
      }

      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
        search: searchText,
      };

      const payload = {
        AssetTypeId: Number(formData.AssetTypeId),
        NotifyBeforeDays: Number(formData.NotifyBeforeDays),
        NotifyOnExpire: Boolean(formData.NotifyOnExpire),
        Active: Boolean(formData.Active),
      };

      if (mode === "create") {
        const action = await dispatch(
          createAssetTypeNotification({ payload, refetch })
        );
        if (!createAssetTypeNotification.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateAssetTypeNotification({
            id: selectedItem.Id,
            payload,
            refetch,
          })
        );
        if (!updateAssetTypeNotification.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteAssetTypeNotification({ id: selectedItem.Id, refetch })
        );
        if (!deleteAssetTypeNotification.fulfilled.match(action)) {
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
    selectedItem,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
    assetTypeOptions,
  };
}
