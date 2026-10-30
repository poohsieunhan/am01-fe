export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
// Role === 1: Admin, Role === 2: User
export const selectIsAdmin = (state) => Number(state.auth.user?.Role) === 1;
export const selectUserRole = (state) => Number(state.auth.user?.Role);
