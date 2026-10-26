// src/components/asset/AssetFormModal.jsx
import Modal from "../common/MyModal";
import MyInputField from "../common/MyInputField";

const STATUS_OPTIONS = [
  { value: 1, label: "Đang sử dụng" },
  { value: 0, label: "Ngưng sử dụng" },
  { value: 2, label: "Đang bảo trì" },
];

function AssetFormModal({
  open,
  mode,
  formData,
  formError,
  submitting,
  selectedAsset,
  assetTypeOptions = [],
  companyOptions = [],
  accountOptions = [],
  projectOptions = [],
  onChange,
  onSubmit,
  onClose,
}) {
  const title =
    mode === "create"
      ? "Thêm tài sản"
      : mode === "edit"
      ? "Chỉnh sửa tài sản"
      : "Xóa tài sản";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "delete" && selectedAsset ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-slate-700">
            Bạn có chắc chắn muốn xóa tài sản{" "}
            <span className="font-semibold">{selectedAsset.Name}</span>{" "}
            (Mã: {selectedAsset.Code || selectedAsset.Id})?
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
              label="Mã tài sản:"
              name="Code"
              value={formData.Code}
              onChange={onChange}
              placeholder="VD: AST-001"
            />
            <MyInputField
              label="Tên tài sản: (*)"
              name="Name"
              value={formData.Name}
              onChange={onChange}
              placeholder="Nhập tên tài sản"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assetTypeOptions.length > 0 ? (
              <MyInputField
                label="Loại tài sản: (*)"
                name="AssetTypeId"
                as="select"
                options={assetTypeOptions}
                value={formData.AssetTypeId}
                onChange={onChange}
              />
            ) : (
              <MyInputField
                label="Loại tài sản (ID): (*)"
                name="AssetTypeId"
                type="number"
                value={formData.AssetTypeId}
                onChange={onChange}
                placeholder="VD: 1"
              />
            )}
            <MyInputField
              label="Trạng thái: (*)"
              name="Status"
              as="select"
              options={STATUS_OPTIONS}
              value={formData.Status}
              onChange={onChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {companyOptions.length > 0 ? (
              <MyInputField
                label="Công ty: (*)"
                name="CompanyId"
                as="select"
                options={companyOptions}
                value={formData.CompanyId}
                onChange={onChange}
              />
            ) : (
              <MyInputField
                label="Công ty ID: (*)"
                name="CompanyId"
                type="number"
                value={formData.CompanyId}
                onChange={onChange}
                placeholder="VD: 1"
              />
            )}

            {accountOptions.length > 0 ? (
              <MyInputField
                label="Người phụ trách: (*)"
                name="AccountId"
                as="select"
                options={accountOptions}
                value={formData.AccountId}
                onChange={onChange}
              />
            ) : (
              <MyInputField
                label="Người phụ trách (ID): (*)"
                name="AccountId"
                type="number"
                value={formData.AccountId}
                onChange={onChange}
                placeholder="VD: 1"
              />
            )}

            {projectOptions.length > 0 ? (
              <MyInputField
                label="Dự án:"
                name="ProjectId"
                as="select"
                options={projectOptions}
                value={formData.ProjectId}
                onChange={onChange}
              />
            ) : (
              <MyInputField
                label="Dự án (ID):"
                name="ProjectId"
                type="number"
                value={formData.ProjectId}
                onChange={onChange}
                placeholder="VD: 1"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInputField
              label="Ngày bắt đầu: (*)"
              name="StartDate"
              type="date"
              value={formData.StartDate}
              onChange={onChange}
            />
            <MyInputField
              label="Ngày hết hạn:"
              name="ExpireDate"
              type="date"
              value={formData.ExpireDate}
              onChange={onChange}
            />
          </div>

          <MyInputField
            label="Mô tả / Ghi chú:"
            name="Description"
            as="textarea"
            rows={3}
            value={formData.Description}
            onChange={onChange}
            placeholder="Nhập thông tin mô tả chi tiết tài sản..."
          />

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

export default AssetFormModal;
