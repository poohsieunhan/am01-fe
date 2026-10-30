import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmailRecipientToolbar from "../components/emailRecipient/EmailRecipientToolbar";
import MyDataTable from "../components/common/MyDataTable";
import EmailRecipientFormModal from "../components/emailRecipient/EmailRecipientFormModal";
import { emailRecipientColumns } from "../components/emailRecipient/emailRecipientColumns";

// Redux
import {
  fetchEmailRecipients,
  setEmailRecipientSearchText,
} from "../features/emailRecipient/emailRecipientSlice";
import {
  selectFilteredEmailRecipients,
  selectEmailRecipientPagination,
  selectEmailRecipientLoading,
  selectEmailRecipientError,
  selectEmailRecipientSearchText,
} from "../features/emailRecipient/emailRecipientSelectors";

import { useEmailRecipientForm } from "../hooks/emailRecipient/useEmailRecipientForm";

function EmailRecipientListPage() {
  const dispatch = useDispatch();

  const filteredRecipients = useSelector(selectFilteredEmailRecipients);
  const pagination = useSelector(selectEmailRecipientPagination);
  const loading = useSelector(selectEmailRecipientLoading);
  const error = useSelector(selectEmailRecipientError);
  const searchText = useSelector(selectEmailRecipientSearchText);

  const {
    open,
    mode,
    selectedRecipient,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useEmailRecipientForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchEmailRecipients({ page: 1, limit, search: searchText }));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, limit, searchText]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchEmailRecipients({ page: nextPage, limit, search: searchText }));
    },
    [dispatch, limit, searchText]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <EmailRecipientToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setEmailRecipientSearchText(val))}
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
              columns={emailRecipientColumns}
              data={filteredRecipients}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(recipient) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(recipient)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(recipient)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <EmailRecipientFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedRecipient={selectedRecipient}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default EmailRecipientListPage;
