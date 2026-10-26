import { createSelector } from "@reduxjs/toolkit";

export const selectAssetTypeList = (state) => state.assetType.list;
export const selectAssetTypePagination = (state) => state.assetType.pagination;
export const selectAssetTypeStatus = (state) => state.assetType.status;
export const selectAssetTypeLoading = (state) =>
  state.assetType.status === "loading";
export const selectAssetTypeError = (state) => state.assetType.error;
export const selectAssetTypeSearchText = (state) => state.assetType.searchText;

export const selectFilteredAssetTypes = createSelector(
  [selectAssetTypeList, selectAssetTypeSearchText],
  (types, searchText) => {
    if (!searchText) return types;

    const keyword = searchText.toLowerCase();
    return (types || []).filter((t) => {
      const code = (t.Code || "").toLowerCase();
      const name = (t.Name || "").toLowerCase();
      return code.includes(keyword) || name.includes(keyword);
    });
  }
);
