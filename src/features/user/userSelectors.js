export const selectUserList = (state) => state.user.list;
export const selectUserPagination = (state) => state.user.pagination;
export const selectUserStatus = (state) => state.user.status;
export const selectUserLoading = (state) => state.user.status === "loading";
export const selectUserError = (state) => state.user.error;
export const selectUserSearchText = (state) => state.user.searchText;

// Danh sách người dùng đã được server tìm kiếm và phân trang
export const selectFilteredUsers = (state) => state.user.list;
