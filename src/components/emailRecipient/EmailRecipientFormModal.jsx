// src/components/emailRecipient/EmailRecipientFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function EmailRecipientFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedRecipient,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm người nhận Email"
      : mode === "edit"
      ? "Chỉnh sửa người nhận Email"
      : "Xóa người nhận Email";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedRecipient ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa người nhận{" "}
            <span className="font-semibold">{selectedRecipient.Name}</span>{" "}
            ({selectedRecipient.Email})?
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
            label="Tên người nhận: (*)"
            name="Name"
            value={formData.Name}
            onChange={onChange}
            placeholder="VD: Quản trị viên, Trưởng phòng..."
          />

          <MyInputField
            label="Địa chỉ Email: (*)"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={onChange}
            placeholder="VD: admin@company.com"
          />

          <div className="pt-2">
            <MyInputField
              label="Kích hoạt nhận email thông báo"
              name="Active"
              type="checkbox"
              checked={formData.Active}
              onChange={onChange}
            />
          </div>

          {formError && <p className="text-sm text-rose-600">{formError}</p>}

          <div className="flex justify-end gap-2 pt-2">
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

export default EmailRecipientFormModal;
