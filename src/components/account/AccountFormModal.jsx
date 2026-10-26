// src/components/account/AccountFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function AccountFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedAccount,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm tài khoản"
      : mode === "edit"
      ? "Chỉnh sửa tài khoản"
      : "Xóa tài khoản";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedAccount ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa tài khoản{" "}
            <span className="font-semibold">{selectedAccount.Name}</span>{" "}
            (Username: {selectedAccount.Username})?
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
            label="Tên hiển thị: (*)"
            name="Name"
            value={formData.Name}
            onChange={onChange}
            placeholder="VD: Nguyễn Văn A"
          />

          <MyInputField
            label="Tên đăng nhập: (*)"
            name="Username"
            value={formData.Username}
            onChange={onChange}
            placeholder="VD: user01"
          />

          <MyInputField
            label={
              mode === "edit"
                ? "Mật khẩu: (để trống nếu không đổi)"
                : "Mật khẩu: (*)"
            }
            name="Password"
            type="password"
            value={formData.Password}
            onChange={onChange}
            placeholder="Nhập mật khẩu"
          />

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

export default AccountFormModal;
