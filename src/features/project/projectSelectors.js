import { createSelector } from "@reduxjs/toolkit";

export const selectProjectList = (state) => state.project.list;
export const selectProjectPagination = (state) => state.project.pagination;
export const selectProjectStatus = (state) => state.project.status;
export const selectProjectLoading = (state) =>
  state.project.status === "loading";
export const selectProjectError = (state) => state.project.error;
export const selectProjectSearchText = (state) => state.project.searchText;

export const selectFilteredProjects = createSelector(
  [selectProjectList, selectProjectSearchText],
  (projects, searchText) => {
    if (!searchText) return projects;

    const keyword = searchText.toLowerCase();
    return (projects || []).filter((p) => {
      const name = (p.Name || "").toLowerCase();
      const addr = (p.Address || "").toLowerCase();
      return name.includes(keyword) || addr.includes(keyword);
    });
  }
);
