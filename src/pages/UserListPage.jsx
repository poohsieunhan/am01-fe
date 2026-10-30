import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserToolbar from "../components/user/UserToolbar";
import MyDataTable from "../components/common/MyDataTable";
import UserFormModal from "../components/user/UserFormModal";
import { userColumns } from "../components/user/userColumns";

// Redux
import {
  fetchUsers,
  setUserSearchText,
} from "../features/user/userSlice";
import {
  selectFilteredUsers,
  selectUserPagination,
  selectUserLoading,
  selectUserError,
  selectUserSearchText,
} from "../features/user/userSelectors";

import { useUserForm } from "../hooks/user/useUserForm";

function UserListPage() {
  const dispatch = useDispatch();

  const filteredUsers = useSelector(selectFilteredUsers);
  const pagination = useSelector(selectUserPagination);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const searchText = useSelector(selectUserSearchText);

  const {
    open,
    mode,
    selectedUser,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useUserForm();

  const limit = pagination?.limit || 10;

  // Tự động tìm kiếm debounce khi người dùng nhập từ khóa
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchUsers({ page: 1, limit, search: searchText }));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, searchText, limit]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchUsers({ page: nextPage, limit, search: searchText }));
    },
    [dispatch, limit, searchText]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <UserToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setUserSearchText(val))}
          onAdd={openCreate}
        />

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {loading && (
            <div className="py-10 text-center text-slate-500">
              Đang tải dữ liệu người dùng...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
              {error}
            </div>
          )}

          {!loading && !error && (
            <MyDataTable
              columns={userColumns}
              data={filteredUsers}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(user) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(user)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(user)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <UserFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedUser={selectedUser}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default UserListPage;
