import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountToolbar from "../components/account/AccountToolbar";
import MyDataTable from "../components/common/MyDataTable";
import AccountFormModal from "../components/account/AccountFormModal";
import { accountColumns } from "../components/account/accountColumns";

// Redux
import {
  fetchAccounts,
  setAccountSearchText,
} from "../features/account/accountSlice";
import {
  selectFilteredAccounts,
  selectAccountPagination,
  selectAccountLoading,
  selectAccountError,
  selectAccountSearchText,
} from "../features/account/accountSelectors";

import { useAccountForm } from "../hooks/account/useAccountForm";

function AccountListPage() {
  const dispatch = useDispatch();

  const filteredAccounts = useSelector(selectFilteredAccounts);
  const pagination = useSelector(selectAccountPagination);
  const loading = useSelector(selectAccountLoading);
  const error = useSelector(selectAccountError);
  const searchText = useSelector(selectAccountSearchText);

  const {
    open,
    mode,
    selectedAccount,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useAccountForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    dispatch(fetchAccounts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchAccounts({ page: nextPage, limit }));
    },
    [dispatch, limit]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <AccountToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setAccountSearchText(val))}
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
              columns={accountColumns}
              data={filteredAccounts}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(account) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(account)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(account)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <AccountFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedAccount={selectedAccount}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default AccountListPage;
