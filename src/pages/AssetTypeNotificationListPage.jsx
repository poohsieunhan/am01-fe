import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AssetTypeNotificationToolbar from "../components/assetTypeNotification/AssetTypeNotificationToolbar";
import MyDataTable from "../components/common/MyDataTable";
import AssetTypeNotificationFormModal from "../components/assetTypeNotification/AssetTypeNotificationFormModal";
import { assetTypeNotificationColumns } from "../components/assetTypeNotification/assetTypeNotificationColumns";

// Redux
import {
  fetchAssetTypeNotifications,
  setAssetTypeNotificationSearchText,
} from "../features/assetTypeNotification/assetTypeNotificationSlice";
import {
  selectFilteredAssetTypeNotifications,
  selectAssetTypeNotificationPagination,
  selectAssetTypeNotificationLoading,
  selectAssetTypeNotificationError,
  selectAssetTypeNotificationSearchText,
} from "../features/assetTypeNotification/assetTypeNotificationSelectors";

import { useAssetTypeNotificationForm } from "../hooks/assetTypeNotification/useAssetTypeNotificationForm";

function AssetTypeNotificationListPage() {
  const dispatch = useDispatch();

  const filteredItems = useSelector(selectFilteredAssetTypeNotifications);
  const pagination = useSelector(selectAssetTypeNotificationPagination);
  const loading = useSelector(selectAssetTypeNotificationLoading);
  const error = useSelector(selectAssetTypeNotificationError);
  const searchText = useSelector(selectAssetTypeNotificationSearchText);

  const {
    open,
    mode,
    selectedItem,
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
  } = useAssetTypeNotificationForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchAssetTypeNotifications({ page: 1, limit, search: searchText }));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, limit, searchText]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchAssetTypeNotifications({ page: nextPage, limit, search: searchText }));
    },
    [dispatch, limit, searchText]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <AssetTypeNotificationToolbar
          searchText={searchText}
          setSearchText={(val) =>
            dispatch(setAssetTypeNotificationSearchText(val))
          }
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
              columns={assetTypeNotificationColumns}
              data={filteredItems}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(item) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(item)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <AssetTypeNotificationFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedItem={selectedItem}
          assetTypeOptions={assetTypeOptions}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default AssetTypeNotificationListPage;
