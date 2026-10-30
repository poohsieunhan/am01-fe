export const selectCompanyList = (state) => state.company.list;
export const selectCompanyPagination = (state) => state.company.pagination;
export const selectCompanyStatus = (state) => state.company.status;
export const selectCompanyLoading = (state) =>
  state.company.status === "loading";
export const selectCompanyError = (state) => state.company.error;
export const selectCompanySearchText = (state) => state.company.searchText;

// Danh sách công ty đã được server tìm kiếm và phân trang
export const selectFilteredCompanies = (state) => state.company.list;
