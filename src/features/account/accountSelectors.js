import { createSelector } from "@reduxjs/toolkit";

export const selectAccountList = (state) => state.account.list;
export const selectAccountPagination = (state) => state.account.pagination;
export const selectAccountStatus = (state) => state.account.status;
export const selectAccountLoading = (state) =>
  state.account.status === "loading";
export const selectAccountError = (state) => state.account.error;
export const selectAccountSearchText = (state) => state.account.searchText;

export const selectFilteredAccounts = createSelector(
  [selectAccountList, selectAccountSearchText],
  (accounts, searchText) => {
    if (!searchText) return accounts;

    const keyword = searchText.toLowerCase();
    return (accounts || []).filter((a) => {
      const name = (a.Name || "").toLowerCase();
      const user = (a.Username || "").toLowerCase();
      return name.includes(keyword) || user.includes(keyword);
    });
  }
);
