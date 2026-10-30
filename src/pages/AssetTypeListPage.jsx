import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AssetTypeToolbar from "../components/assetType/AssetTypeToolbar";
import MyDataTable from "../components/common/MyDataTable";
import AssetTypeFormModal from "../components/assetType/AssetTypeFormModal";
import { assetTypeColumns } from "../components/assetType/assetTypeColumns";

// Redux
import {
  fetchAssetTypes,
  setAssetTypeSearchText,
} from "../features/assetType/assetTypeSlice";
import {
  selectFilteredAssetTypes,
  selectAssetTypePagination,
  selectAssetTypeLoading,
  selectAssetTypeError,
  selectAssetTypeSearchText,
} from "../features/assetType/assetTypeSelectors";

import { useAssetTypeForm } from "../hooks/assetType/useAssetTypeForm";

function AssetTypeListPage() {
  const dispatch = useDispatch();

  // selectors
  const filteredAssetTypes = useSelector(selectFilteredAssetTypes);
  const pagination = useSelector(selectAssetTypePagination);
  const loading = useSelector(selectAssetTypeLoading);
  const error = useSelector(selectAssetTypeError);
  const searchText = useSelector(selectAssetTypeSearchText);

  const {
    open,
    mode,
    selectedAssetType,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useAssetTypeForm();

  const limit = pagination?.limit || 10;

  // Tự động tìm kiếm debounce khi người dùng nhập từ khóa
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchAssetTypes({ page: 1, limit, search: searchText }));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, searchText, limit]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchAssetTypes({ page: nextPage, limit, search: searchText }));
    },
    [dispatch, limit, searchText]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <AssetTypeToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setAssetTypeSearchText(val))}
          onAdd={openCreate}
        />

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {loading && (
            <div className="py-10 text-center text-slate-500">
              Đang tải dữ liệu...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
              {error}
            </div>
          )}

          {!loading && !error && (
            <MyDataTable
              columns={assetTypeColumns}
              data={filteredAssetTypes}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(assetType) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(assetType)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(assetType)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <AssetTypeFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedAssetType={selectedAssetType}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default AssetTypeListPage;
