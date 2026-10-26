import { createSelector } from "@reduxjs/toolkit";

export const selectEmailConfigList = (state) => state.emailConfig.list;
export const selectEmailConfigPagination = (state) =>
  state.emailConfig.pagination;
export const selectEmailConfigStatus = (state) => state.emailConfig.status;
export const selectEmailConfigLoading = (state) =>
  state.emailConfig.status === "loading";
export const selectEmailConfigError = (state) => state.emailConfig.error;
export const selectEmailConfigSearchText = (state) =>
  state.emailConfig.searchText;

export const selectFilteredEmailConfigs = createSelector(
  [selectEmailConfigList, selectEmailConfigSearchText],
  (configs, searchText) => {
    if (!searchText) return configs;

    const keyword = searchText.toLowerCase();
    return (configs || []).filter((c) => {
      const provider = (c.Provider || "").toLowerCase();
      const host = (c.Host || "").toLowerCase();
      const email = (c.FromEmail || "").toLowerCase();
      const name = (c.FromName || "").toLowerCase();
      return (
        provider.includes(keyword) ||
        host.includes(keyword) ||
        email.includes(keyword) ||
        name.includes(keyword)
      );
    });
  }
);
