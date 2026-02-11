// src/components/company/CompanyFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function CompanyFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedCompany,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm công ty"
      : mode === "edit"
      ? "Chỉnh sửa công ty"
      : "Xóa công ty";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedCompany ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa công ty{" "}
            <span className="font-semibold">{selectedCompany.TenCongTy}</span>{" "}
            (ID: {selectedCompany.Id})?
          </p>
          {formError && <p className="text-sm text-rose-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50"
            >
              {submitting ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 text-left">
          <MyInputField
            label="Tên công ty: (*)"
            name="TenCongTy"
            value={formData.TenCongTy}
            onChange={onChange}
          />
          <MyInputField
            label="Địa chỉ:"
            name="DiaChi"
            value={formData.DiaChi}
            onChange={onChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Người đại diện:"
              name="NguoiDaiDien"
              value={formData.NguoiDaiDien}             
              onChange={onChange}
            />
            <MyInputField
              label="Chức vụ:"
              name="ChucVu"
              value={formData.ChucVu}
              onChange={onChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Mã số thuế: (*)"
              name="MaSoThue"
              value={formData.MaSoThue}
              onChange={onChange}
            />
            <MyInputField
              label="Email:"
              name="Email"
              type="email"
              value={formData.Email}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Số điện thoại:"
              name="Tel"
              value={formData.Tel}
              onChange={onChange}
            />
            <MyInputField
              label="Fax:"
              name="Fax"
              value={formData.Fax}
              onChange={onChange}
            />
          </div>

          {formError && <p className="text-sm text-rose-600">{formError}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting
                ? "Đang lưu..."
                : mode === "create"
                ? "Tạo mới"
                : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default CompanyFormModal;
