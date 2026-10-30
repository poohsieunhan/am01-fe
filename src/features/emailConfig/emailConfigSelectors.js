export const selectEmailConfigList = (state) => state.emailConfig.list;
export const selectEmailConfigPagination = (state) =>
  state.emailConfig.pagination;
export const selectEmailConfigStatus = (state) => state.emailConfig.status;
export const selectEmailConfigLoading = (state) =>
  state.emailConfig.status === "loading";
export const selectEmailConfigError = (state) => state.emailConfig.error;
export const selectEmailConfigSearchText = (state) =>
  state.emailConfig.searchText;

// Danh sách cấu hình email đã được server tìm kiếm và phân trang
export const selectFilteredEmailConfigs = (state) => state.emailConfig.list;
