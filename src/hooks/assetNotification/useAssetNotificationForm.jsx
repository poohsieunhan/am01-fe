import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAssetNotification,
  deleteAssetNotification,
  updateAssetNotification,
} from "../../features/assetNotification/assetNotificationSlice";
import {
  selectAssetNotificationPagination,
  selectAssetNotificationSearchText,
} from "../../features/assetNotification/assetNotificationSelectors";
import assetApi from "../../services/assetApi";
import { useEffect } from "react";

function initialForm() {
  return {
    AssetId: "1",
    NotifyBeforeDays: "30",
    NotifyOnExpire: true,
    Active: true,
  };
}

export function useAssetNotificationForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectAssetNotificationPagination);
  const searchText = useSelector(selectAssetNotificationSearchText);
  const [assetOption, setAssetOption] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedItem(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  useEffect(() => {
    assetApi
      .getAll({ page: 1, limit: 100 })
      .then((res) => {
        const list = res?.data || [];
        setAssetOption(
          list.map((t) => ({
            value: String(t.Id),
            label: `${t.Name} (${t.Code || t.Id})`,
          }))
        );
      })
      .catch(() => { });
  }, []);

  const openEdit = (item) => {
    setMode("edit");
    setSelectedItem(item);
    setFormData({
      AssetId: item.AssetId != null ? String(item.AssetId) : "1",
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
        if (!formData.AssetId) {
          setFormError("Asset ID là bắt buộc.");
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
        AssetId: Number(formData.AssetId),
        NotifyBeforeDays: Number(formData.NotifyBeforeDays),
        NotifyOnExpire: Boolean(formData.NotifyOnExpire),
        Active: Boolean(formData.Active),
      };

      if (mode === "create") {
        const action = await dispatch(
          createAssetNotification({ payload, refetch })
        );
        if (!createAssetNotification.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateAssetNotification({
            id: selectedItem.Id,
            payload,
            refetch,
          })
        );
        if (!updateAssetNotification.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteAssetNotification({ id: selectedItem.Id, refetch })
        );
        if (!deleteAssetNotification.fulfilled.match(action)) {
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
    assetOption
  };
}
