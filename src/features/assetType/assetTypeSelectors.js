export const selectAssetTypeList = (state) => state.assetType.list;
export const selectAssetTypePagination = (state) => state.assetType.pagination;
export const selectAssetTypeStatus = (state) => state.assetType.status;
export const selectAssetTypeLoading = (state) =>
  state.assetType.status === "loading";
export const selectAssetTypeError = (state) => state.assetType.error;
export const selectAssetTypeSearchText = (state) => state.assetType.searchText;

// Danh sách loại tài sản đã được server tìm kiếm và phân trang
export const selectFilteredAssetTypes = (state) => state.assetType.list;
