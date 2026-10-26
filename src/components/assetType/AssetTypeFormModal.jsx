// src/components/assetType/AssetTypeFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function AssetTypeFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedAssetType,
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm loại tài sản"
      : mode === "edit"
      ? "Chỉnh sửa loại tài sản"
      : "Xóa loại tài sản";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedAssetType ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa loại tài sản{" "}
            <span className="font-semibold">{selectedAssetType.Name}</span>{" "}
            (Mã: {selectedAssetType.Code})?
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
            label="Mã loại tài sản: (*)"
            name="Code"
            value={formData.Code}
            onChange={onChange}
            placeholder="VD: LAPTOP, MONITOR, SERVER..."
          />

          <MyInputField
            label="Tên loại tài sản: (*)"
            name="Name"
            value={formData.Name}
            onChange={onChange}
            placeholder="VD: Máy tính xách tay, Màn hình..."
          />

          <div className="pt-2">
            <MyInputField
              label="Có thời hạn sử dụng / hạn bảo hành"
              name="HasExpire"
              type="checkbox"
              checked={formData.HasExpire}
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

export default AssetTypeFormModal;
