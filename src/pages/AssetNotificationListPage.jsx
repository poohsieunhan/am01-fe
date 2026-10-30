import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AssetNotificationToolbar from "../components/assetNotification/AssetNotificationToolbar";
import MyDataTable from "../components/common/MyDataTable";
import AssetNotificationFormModal from "../components/assetNotification/AssetNotificationFormModal";
import { assetNotificationColumns } from "../components/assetNotification/assetNotificationColumns";

// Redux
import {
  fetchAssetNotifications,
  setAssetNotificationSearchText,
} from "../features/assetNotification/assetNotificationSlice";
import {
  selectFilteredAssetNotifications,
  selectAssetNotificationPagination,
  selectAssetNotificationLoading,
  selectAssetNotificationError,
  selectAssetNotificationSearchText,
} from "../features/assetNotification/assetNotificationSelectors";

import { useAssetNotificationForm } from "../hooks/assetNotification/useAssetNotificationForm";

function AssetNotificationListPage() {
  const dispatch = useDispatch();

  const filteredItems = useSelector(selectFilteredAssetNotifications);
  const pagination = useSelector(selectAssetNotificationPagination);
  const loading = useSelector(selectAssetNotificationLoading);
  const error = useSelector(selectAssetNotificationError);
  const searchText = useSelector(selectAssetNotificationSearchText);

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
    assetOption,
  } = useAssetNotificationForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchAssetNotifications({ page: 1, limit, search: searchText }));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, limit, searchText]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchAssetNotifications({ page: nextPage, limit, search: searchText }));
    },
    [dispatch, limit, searchText]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <AssetNotificationToolbar
          searchText={searchText}
          setSearchText={(val) =>
            dispatch(setAssetNotificationSearchText(val))
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
              columns={assetNotificationColumns}
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

        <AssetNotificationFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedItem={selectedItem}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          assetOption={assetOption}
        />
      </div>
    </div>
  );
}

export default AssetNotificationListPage;
