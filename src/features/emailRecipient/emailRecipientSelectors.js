export const selectEmailRecipientList = (state) => state.emailRecipient.list;
export const selectEmailRecipientPagination = (state) =>
  state.emailRecipient.pagination;
export const selectEmailRecipientStatus = (state) => state.emailRecipient.status;
export const selectEmailRecipientLoading = (state) =>
  state.emailRecipient.status === "loading";
export const selectEmailRecipientError = (state) => state.emailRecipient.error;
export const selectEmailRecipientSearchText = (state) =>
  state.emailRecipient.searchText;

// Danh sách người nhận email đã được server tìm kiếm và phân trang
export const selectFilteredEmailRecipients = (state) => state.emailRecipient.list;
