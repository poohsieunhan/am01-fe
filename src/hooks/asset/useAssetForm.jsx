import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAsset,
  deleteAsset,
  updateAsset,
} from "../../features/asset/assetSlice";
import { selectAssetPagination } from "../../features/asset/assetSelectors";
import assetTypeApi from "../../services/assetTypeApi";
import companyApi from "../../services/companyApi";
import accountApi from "../../services/accountApi";
import projectApi from "../../services/projectApi";

function initialForm() {
  return {
    Code: "",
    Name: "",
    AssetTypeId: "2",
    Status: "1",
    CompanyId: "1",
    AccountId: "1",
    ProjectId: "",
    StartDate: new Date().toISOString().slice(0, 10),
    ExpireDate: "",
    Description: "",
  };
}

function formatDateForInput(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export function useAssetForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectAssetPagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    assetTypeApi
      .getAll({ page: 1, limit: 100 })
      .then((res) => {
        const list = res?.data || [];
        setAssetTypeOptions(
          list.map((t) => ({
            value: String(t.Id),
            label: `${t.Name} (${t.Code || t.Id})`,
          }))
        );
      })
      .catch(() => { });

    companyApi
      .getAll({ page: 1, limit: 100 })
      .then((res) => {
        const list = res?.data || [];
        setCompanyOptions(
          list.map((c) => ({
            value: String(c.Id),
            label: c.TenCongTy || `Công ty #${c.Id}`,
          }))
        );
      })
      .catch(() => { });

    accountApi
      .getAll({ page: 1, limit: 100 })
      .then((res) => {
        const list = res?.data || [];
        setAccountOptions(
          list.map((a) => ({
            value: String(a.Id),
            label: `${a.Name}`,
          }))
        );
      })
      .catch(() => { });

    projectApi
      .getAll({ page: 1, limit: 100 })
      .then((res) => {
        const list = res?.data || [];
        setProjectOptions(
          list.map((p) => ({
            value: String(p.Id),
            label: p.Name || `Dự án #${p.Id}`,
          }))
        );
      })
      .catch(() => { });
  }, []);

  const openCreate = () => {
    setMode("create");
    setSelectedAsset(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (asset) => {
    setMode("edit");
    setSelectedAsset(asset);
    setFormData({
      Code: asset.Code || "",
      Name: asset.Name || "",
      AssetTypeId: asset.AssetTypeId != null ? String(asset.AssetTypeId) : "1",
      Status: asset.Status != null ? String(asset.Status) : "1",
      CompanyId: asset.CompanyId != null ? String(asset.CompanyId) : "1",
      AccountId: asset.AccountId != null ? String(asset.AccountId) : "1",
      ProjectId: asset.ProjectId != null ? String(asset.ProjectId) : "",
      StartDate: formatDateForInput(asset.StartDate),
      ExpireDate: formatDateForInput(asset.ExpireDate),
      Description: asset.Description || "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (asset) => {
    setMode("delete");
    setSelectedAsset(asset);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedAsset(null);
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
          setFormError("Tên tài sản là bắt buộc.");
          return;
        }

        if (!formData.AssetTypeId) {
          setFormError("Loại tài sản là bắt buộc.");
          return;
        }

        if (!formData.CompanyId) {
          setFormError("Công ty là bắt buộc.");
          return;
        }

        if (!formData.AccountId) {
          setFormError("Người phụ trách là bắt buộc.");
          return;
        }

        if (!formData.StartDate) {
          setFormError("Ngày bắt đầu là bắt buộc.");
          return;
        }
      }

      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
      };

      const payload = {
        Code: formData.Code?.trim() || null,
        Name: formData.Name?.trim(),
        AssetTypeId: Number(formData.AssetTypeId),
        Status: Number(formData.Status),
        CompanyId: Number(formData.CompanyId),
        AccountId: Number(formData.AccountId),
        ProjectId: formData.ProjectId ? Number(formData.ProjectId) : null,
        StartDate: formData.StartDate,
        ExpireDate: formData.ExpireDate || null,
        Description: formData.Description?.trim() || null,
      };

      if (mode === "create") {
        const action = await dispatch(createAsset({ payload, refetch }));
        if (!createAsset.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateAsset({ id: selectedAsset.Id, payload, refetch })
        );
        if (!updateAsset.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteAsset({ id: selectedAsset.Id, refetch })
        );
        if (!deleteAsset.fulfilled.match(action)) {
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
    selectedAsset,
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
    companyOptions,
    accountOptions,
    projectOptions,
  };
}
