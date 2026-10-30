import { createSelector } from "@reduxjs/toolkit";

export const selectAssetList = (state) => state.asset.list;
export const selectAssetPagination = (state) => state.asset.pagination;
export const selectAssetStatus = (state) => state.asset.status;
export const selectAssetLoading = (state) => state.asset.status === "loading";
export const selectAssetError = (state) => state.asset.error;
export const selectAssetSearchText = (state) => state.asset.searchText;

// Danh sách tài sản đã được server tìm kiếm và phân trang
export const selectFilteredAssets = (state) => state.asset.list;
