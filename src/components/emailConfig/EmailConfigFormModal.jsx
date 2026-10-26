// src/components/emailConfig/EmailConfigFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function EmailConfigFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedConfig,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm cấu hình Email"
      : mode === "edit"
      ? "Chỉnh sửa cấu hình Email"
      : "Xóa cấu hình Email";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedConfig ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa cấu hình Email{" "}
            <span className="font-semibold">{selectedConfig.Provider}</span>{" "}
            ({selectedConfig.FromEmail})?
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Nhà cung cấp: (*)"
              name="Provider"
              value={formData.Provider}
              onChange={onChange}
              placeholder="VD: Gmail, Outlook, SMTP..."
            />
            <MyInputField
              label="Host máy chủ: (*)"
              name="Host"
              value={formData.Host}
              onChange={onChange}
              placeholder="VD: smtp.gmail.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Port: (*)"
              name="Port"
              value={formData.Port}
              onChange={onChange}
              placeholder="VD: 587 hoặc 465"
            />
            <MyInputField
              label="Bảo mật (Secure): (*)"
              name="Secure"
              value={formData.Secure}
              onChange={onChange}
              placeholder="VD: TLS, SSL, STARTTLS"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Tài khoản đăng nhập SMTP: (*)"
              name="Username"
              value={formData.Username}
              onChange={onChange}
              placeholder="Username SMTP"
            />
            <MyInputField
              label="Mật khẩu SMTP: (*)"
              name="Password"
              type="password"
              value={formData.Password}
              onChange={onChange}
              placeholder="App password"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Email gửi (From): (*)"
              name="FromEmail"
              type="email"
              value={formData.FromEmail}
              onChange={onChange}
              placeholder="VD: notification@example.com"
            />
            <MyInputField
              label="Tên hiển thị người gửi: (*)"
              name="FromName"
              value={formData.FromName}
              onChange={onChange}
              placeholder="VD: Hệ Thống Cảnh Báo Tài Sản"
            />
          </div>

          <div className="pt-2">
            <MyInputField
              label="Kích hoạt cấu hình này"
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

export default EmailConfigFormModal;
