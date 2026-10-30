export const selectAssetNotificationList = (state) =>
  state.assetNotification.list;
export const selectAssetNotificationPagination = (state) =>
  state.assetNotification.pagination;
export const selectAssetNotificationStatus = (state) =>
  state.assetNotification.status;
export const selectAssetNotificationLoading = (state) =>
  state.assetNotification.status === "loading";
export const selectAssetNotificationError = (state) =>
  state.assetNotification.error;
export const selectAssetNotificationSearchText = (state) =>
  state.assetNotification.searchText;

export const selectFilteredAssetNotifications = (state) =>
  state.assetNotification.list;
