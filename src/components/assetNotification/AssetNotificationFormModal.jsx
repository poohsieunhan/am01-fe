// src/components/assetNotification/AssetNotificationFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

function AssetNotificationFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedItem,
  onChange,
  onSubmit,
  onClose,
  assetOption = []
}) {
  const title =
    mode === "create"
      ? "Thêm cảnh báo tài sản"
      : mode === "edit"
        ? "Chỉnh sửa cảnh báo tài sản"
        : "Xóa cấu hình cảnh báo";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedItem ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa cấu hình cảnh báo cho Tài sản ID{" "}
            <span className="font-semibold">{selectedItem.AssetId}</span>{" "}
            (ID cấu hình: {selectedItem.Id})?
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
            {assetOption?.length > 0 ? (
              <MyInputField
                label="Tài sản (Asset ID): (*)"
                name="AssetId"
                as="select"
                options={assetOption}
                value={formData.AssetId}
                onChange={onChange}
              />
            ) : (
              <MyInputField
                label="Tài sản (Asset ID): (*)"
                name="AssetId"
                type="number"
                value={formData.AssetId}
                onChange={onChange}
                placeholder="VD: 1"
              />
            )}

            <MyInputField
              label="Số ngày báo trước: (*)"
              name="NotifyBeforeDays"
              type="number"
              value={formData.NotifyBeforeDays}
              onChange={onChange}
              placeholder="VD: 30"
            />
          </div>

          <div className="space-y-2 pt-2">
            <MyInputField
              label="Cảnh báo vào đúng ngày hết hạn"
              name="NotifyOnExpire"
              type="checkbox"
              checked={formData.NotifyOnExpire}
              onChange={onChange}
            />

            <MyInputField
              label="Kích hoạt cảnh báo"
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

export default AssetNotificationFormModal;
