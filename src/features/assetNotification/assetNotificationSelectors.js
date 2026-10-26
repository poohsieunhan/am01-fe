import { createSelector } from "@reduxjs/toolkit";

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

export const selectFilteredAssetNotifications = createSelector(
  [selectAssetNotificationList, selectAssetNotificationSearchText],
  (list, searchText) => {
    if (!searchText) return list;

    const keyword = searchText.toLowerCase();
    return (list || []).filter((item) => {
      const assetId = String(item.AssetId || "");
      const days = String(item.NotifyBeforeDays || "");
      return assetId.includes(keyword) || days.includes(keyword);
    });
  }
);
