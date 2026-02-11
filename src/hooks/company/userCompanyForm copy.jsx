// src/hooks/useCompanyForm.js
import { useState } from "react";
import companyApi from "../../services/companyApi";
import toast from "react-hot-toast";

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

export function useCompanyForm({ fetchCompanies }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit' | 'delete'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // open/close modal
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

  const handleSubmit = async (e, pagination) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (
        (mode === "create" || mode === "edit") &&
        !formData.TenCongTy.trim() &&
        formData.MaSoThue.trim()
      ) {
        setFormError("Tên công ty là bắt buộc.");
        setFormError("Mã số thuế là bắt buộc.");
        setSubmitting(false);
        return;
      }

      if (mode === "create") {
        try {
          await companyApi.add(formData);
          await fetchCompanies({ page: 1, limit: 10 });
          setOpen(false);
          toast.success("Thêm mới công ty thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi thêm mới công ty.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "edit" && selectedCompany) {
        try {
          await companyApi.update(selectedCompany.Id, formData);
          await fetchCompanies({
            page: pagination?.page || 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Cập nhật công ty thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message ||
            "Có lỗi xảy ra khi cập nhật công ty.";
          setFormError(msg);
          toast.error(msg);
        }
      }

      if (mode === "delete" && selectedCompany) {
        try {
          await companyApi.delete(selectedCompany.Id);
          await fetchCompanies({
            page: 1,
            limit: pagination?.limit || 10,
          });
          setOpen(false);
          toast.success("Xóa công ty thành công.");
        } catch (error) {
          const msg =
            error.response?.data?.message || "Có lỗi xảy ra khi xóa công ty.";
          setFormError(msg);
          toast.error(msg);
        }
      }
    } catch (err) {
      console.error(err);
      setFormError("Có lỗi xảy ra khi lưu dữ liệu. Kiểm tra lại backend.");
      toast.error("Có lỗi xảy ra khi lưu dữ liệu.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // state
    open,
    mode,
    selectedCompany,
    formData,
    formError,
    submitting,
    // handlers
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  };
}
