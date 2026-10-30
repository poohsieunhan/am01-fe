export const selectAccountList = (state) => state.account.list;
export const selectAccountPagination = (state) => state.account.pagination;
export const selectAccountStatus = (state) => state.account.status;
export const selectAccountLoading = (state) =>
  state.account.status === "loading";
export const selectAccountError = (state) => state.account.error;
export const selectAccountSearchText = (state) => state.account.searchText;

// Danh sách tài khoản đã được server tìm kiếm và phân trang
export const selectFilteredAccounts = (state) => state.account.list;
