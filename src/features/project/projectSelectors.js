export const selectProjectList = (state) => state.project.list;
export const selectProjectPagination = (state) => state.project.pagination;
export const selectProjectStatus = (state) => state.project.status;
export const selectProjectLoading = (state) =>
  state.project.status === "loading";
export const selectProjectError = (state) => state.project.error;
export const selectProjectSearchText = (state) => state.project.searchText;

// Danh sách dự án đã được server tìm kiếm và phân trang
export const selectFilteredProjects = (state) => state.project.list;
