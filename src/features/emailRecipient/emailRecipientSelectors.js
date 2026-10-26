import { createSelector } from "@reduxjs/toolkit";

export const selectEmailRecipientList = (state) => state.emailRecipient.list;
export const selectEmailRecipientPagination = (state) =>
  state.emailRecipient.pagination;
export const selectEmailRecipientStatus = (state) => state.emailRecipient.status;
export const selectEmailRecipientLoading = (state) =>
  state.emailRecipient.status === "loading";
export const selectEmailRecipientError = (state) => state.emailRecipient.error;
export const selectEmailRecipientSearchText = (state) =>
  state.emailRecipient.searchText;

export const selectFilteredEmailRecipients = createSelector(
  [selectEmailRecipientList, selectEmailRecipientSearchText],
  (recipients, searchText) => {
    if (!searchText) return recipients;

    const keyword = searchText.toLowerCase();
    return (recipients || []).filter((r) => {
      const email = (r.Email || "").toLowerCase();
      const name = (r.Name || "").toLowerCase();
      return email.includes(keyword) || name.includes(keyword);
    });
  }
);
