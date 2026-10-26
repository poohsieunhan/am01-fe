// src/components/project/ProjectFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function ProjectFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedProject,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm dự án"
      : mode === "edit"
      ? "Chỉnh sửa dự án"
      : "Xóa dự án";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedProject ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa dự án{" "}
            <span className="font-semibold">{selectedProject.Name}</span>{" "}
            (ID: {selectedProject.Id})?
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
            label="Tên dự án: (*)"
            name="Name"
            value={formData.Name}
            onChange={onChange}
            placeholder="Nhập tên dự án"
          />

          <MyInputField
            label="Địa chỉ: (*)"
            name="Address"
            value={formData.Address}
            onChange={onChange}
            placeholder="Nhập địa chỉ dự án"
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

export default ProjectFormModal;
