import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AssetToolbar from "../components/asset/AssetToolbar";
import MyDataTable from "../components/common/MyDataTable";
import AssetFormModal from "../components/asset/AssetFormModal";
import { assetColumns } from "../components/asset/assetColumns";

// Redux
import {
  fetchAssets,
  setAssetSearchText,
} from "../features/asset/assetSlice";
import {
  selectFilteredAssets,
  selectAssetPagination,
  selectAssetLoading,
  selectAssetError,
  selectAssetSearchText,
} from "../features/asset/assetSelectors";

import { useAssetForm } from "../hooks/asset/useAssetForm";

function AssetListPage() {
  const dispatch = useDispatch();

  // selectors
  const filteredAssets = useSelector(selectFilteredAssets);
  const pagination = useSelector(selectAssetPagination);
  const loading = useSelector(selectAssetLoading);
  const error = useSelector(selectAssetError);
  const searchText = useSelector(selectAssetSearchText);

  const {
    open,
    mode,
    selectedAsset,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
    assetTypeOptions,
    companyOptions,
    accountOptions,
    projectOptions,
  } = useAssetForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    dispatch(fetchAssets({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchAssets({ page: nextPage, limit }));
    },
    [dispatch, limit]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <AssetToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setAssetSearchText(val))}
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
              columns={assetColumns}
              data={filteredAssets}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(asset) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(asset)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(asset)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <AssetFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedAsset={selectedAsset}
          assetTypeOptions={assetTypeOptions}
          companyOptions={companyOptions}
          accountOptions={accountOptions}
          projectOptions={projectOptions}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default AssetListPage;
