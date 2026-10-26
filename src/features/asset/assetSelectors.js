import { createSelector } from "@reduxjs/toolkit";

export const selectAssetList = (state) => state.asset.list;
export const selectAssetPagination = (state) => state.asset.pagination;
export const selectAssetStatus = (state) => state.asset.status;
export const selectAssetLoading = (state) => state.asset.status === "loading";
export const selectAssetError = (state) => state.asset.error;
export const selectAssetSearchText = (state) => state.asset.searchText;

export const selectFilteredAssets = createSelector(
  [selectAssetList, selectAssetSearchText],
  (assets, searchText) => {
    if (!searchText) return assets;

    const keyword = searchText.toLowerCase();
    return (assets || []).filter((a) => {
      const name = (a.Name || "").toLowerCase();
      const code = (a.Code || "").toLowerCase();
      const desc = (a.Description || "").toLowerCase();
      const typeName = (a.assetTypeId?.Name || "").toLowerCase();
      const compName = (a.company?.TenCongTy || "").toLowerCase();
      const accName = (a.account?.Name || "").toLowerCase();
      const accUser = (a.account?.Username || "").toLowerCase();
      const projName = (a.project?.Name || "").toLowerCase();
      return (
        name.includes(keyword) ||
        code.includes(keyword) ||
        desc.includes(keyword) ||
        typeName.includes(keyword) ||
        compName.includes(keyword) ||
        accName.includes(keyword) ||
        accUser.includes(keyword) ||
        projName.includes(keyword)
      );
    });
  }
);
