import { createSelector } from "@reduxjs/toolkit";

export const selectCompanyList = (state) => state.company.list;
export const selectCompanyPagination = (state) => state.company.pagination;
export const selectCompanyStatus = (state) => state.company.status;
export const selectCompanyLoading = (state) =>
  state.company.status === "loading";
export const selectCompanyError = (state) => state.company.error;
export const selectCompanySearchText = (state) => state.company.searchText;

export const selectFilteredCompanies = createSelector(
  [selectCompanyList, selectCompanySearchText],
  (companies, searchText) => {
    if (!searchText) return companies;

    const keyword = searchText.toLowerCase();
    return (companies || []).filter((c) => {
      const ten = (c.TenCongTy || "").toLowerCase();
      const mst = (c.MaSoThue || "").toLowerCase();
      return ten.includes(keyword) || mst.includes(keyword);
    });
  }
);
