import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmailConfigToolbar from "../components/emailConfig/EmailConfigToolbar";
import MyDataTable from "../components/common/MyDataTable";
import EmailConfigFormModal from "../components/emailConfig/EmailConfigFormModal";
import { emailConfigColumns } from "../components/emailConfig/emailConfigColumns";

// Redux
import {
  fetchEmailConfigs,
  setEmailConfigSearchText,
} from "../features/emailConfig/emailConfigSlice";
import {
  selectFilteredEmailConfigs,
  selectEmailConfigPagination,
  selectEmailConfigLoading,
  selectEmailConfigError,
  selectEmailConfigSearchText,
} from "../features/emailConfig/emailConfigSelectors";

import { useEmailConfigForm } from "../hooks/emailConfig/useEmailConfigForm";

function EmailConfigListPage() {
  const dispatch = useDispatch();

  const filteredConfigs = useSelector(selectFilteredEmailConfigs);
  const pagination = useSelector(selectEmailConfigPagination);
  const loading = useSelector(selectEmailConfigLoading);
  const error = useSelector(selectEmailConfigError);
  const searchText = useSelector(selectEmailConfigSearchText);

  const {
    open,
    mode,
    selectedConfig,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useEmailConfigForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    dispatch(fetchEmailConfigs({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchEmailConfigs({ page: nextPage, limit }));
    },
    [dispatch, limit]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <EmailConfigToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setEmailConfigSearchText(val))}
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
              columns={emailConfigColumns}
              data={filteredConfigs}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(config) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(config)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(config)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <EmailConfigFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedConfig={selectedConfig}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default EmailConfigListPage;
