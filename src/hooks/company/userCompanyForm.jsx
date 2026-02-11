import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../features/company/companySlice";
import { selectCompanyPagination } from "../../features/company/companySelectors";

function initialForm() {
  return {
    TenCongTy: "",
    DiaChi: "",
    NguoiDaiDien: "",
    ChucVu: "",
    MaSoThue: "",
    Email: "",
    Tel: "",
    Fax: "",
  };
}

export function useCompanyForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectCompanyPagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'delete'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedCompany(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (company) => {
    setMode("edit");
    setSelectedCompany(company);
    setFormData({
      TenCongTy: company.TenCongTy || "",
      DiaChi: company.DiaChi || "",
      NguoiDaiDien: company.NguoiDaiDien || "",
      ChucVu: company.ChucVu || "",
      MaSoThue: company.MaSoThue || "",
      Email: company.Email || "",
      Tel: company.Tel || "",
      Fax: company.Fax || "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (company) => {
    setMode("delete");
    setSelectedCompany(company);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedCompany(null);
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
        if (!formData.TenCongTy.trim()) {
          setFormError("Tên công ty là bắt buộc.");
          return;
        }
        if (!formData.MaSoThue.trim()) {
          setFormError("Mã số thuế là bắt buộc.");
          return;
        }
      }

      // create về page 1; edit giữ page hiện tại; delete về page 1
      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
      };

      if (mode === "create") {
        await dispatch(createCompany({ payload: formData, refetch })).unwrap();
        setOpen(false);
      }

      if (mode === "edit" && selectedCompany) {
        await dispatch(
          updateCompany({ id: selectedCompany.Id, payload: formData, refetch })
        ).unwrap();
        setOpen(false);
      }

      if (mode === "delete" && selectedCompany) {
        await dispatch(
          deleteCompany({ id: selectedCompany.Id, refetch })
        ).unwrap();
        setOpen(false);
      }
    } catch (err) {
      setFormError(err?.message || "Có lỗi xảy ra khi lưu dữ liệu.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    open,
    mode,
    selectedCompany,
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
