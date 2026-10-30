export const selectAssetTypeNotificationList = (state) =>
  state.assetTypeNotification.list;
export const selectAssetTypeNotificationPagination = (state) =>
  state.assetTypeNotification.pagination;
export const selectAssetTypeNotificationStatus = (state) =>
  state.assetTypeNotification.status;
export const selectAssetTypeNotificationLoading = (state) =>
  state.assetTypeNotification.status === "loading";
export const selectAssetTypeNotificationError = (state) =>
  state.assetTypeNotification.error;
export const selectAssetTypeNotificationSearchText = (state) =>
  state.assetTypeNotification.searchText;

export const selectFilteredAssetTypeNotifications = (state) =>
  state.assetTypeNotification.list;
