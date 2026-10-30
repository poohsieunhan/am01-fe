// src/components/user/UserFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

const ROLE_OPTIONS = [
  { value: "1", label: "Quản trị viên (Role: 1 - Admin)" },
  { value: "2", label: "Người dùng (Role: 2 - User)" },
];

function UserFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedUser,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm người dùng"
      : mode === "edit"
      ? "Chỉnh sửa người dùng"
      : "Xóa người dùng";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedUser ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa người dùng{" "}
            <span className="font-semibold text-rose-600">
              {selectedUser.LoginName}
            </span>{" "}
            (ID: {selectedUser.Id})?
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
            label="Tên đăng nhập (LoginName): (*)"
            name="LoginName"
            value={formData.LoginName}
            onChange={onChange}
            placeholder="VD: admin, user01..."
          />

          <MyInputField
            label="Vai trò / Quyền (Role): (*)"
            name="Role"
            as="select"
            options={ROLE_OPTIONS}
            value={String(formData.Role)}
            onChange={onChange}
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

export default UserFormModal;
