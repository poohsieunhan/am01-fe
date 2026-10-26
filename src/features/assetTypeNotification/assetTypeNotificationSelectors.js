import { createSelector } from "@reduxjs/toolkit";

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

export const selectFilteredAssetTypeNotifications = createSelector(
  [selectAssetTypeNotificationList, selectAssetTypeNotificationSearchText],
  (list, searchText) => {
    if (!searchText) return list;

    const keyword = searchText.toLowerCase();
    return (list || []).filter((item) => {
      const typeId = String(item.AssetTypeId || "");
      const typeName = (item.assetType?.Name || "").toLowerCase();
      const typeCode = (item.assetType?.Code || "").toLowerCase();
      const days = String(item.NotifyBeforeDays || "");
      return (
        typeId.includes(keyword) ||
        typeName.includes(keyword) ||
        typeCode.includes(keyword) ||
        days.includes(keyword)
      );
    });
  }
);
