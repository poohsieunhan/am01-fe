import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { selectIsAdmin } from "../features/auth/authSelectors";

import CompanyListPage from "../pages/CompanyListPage";
import AssetListPage from "../pages/AssetListPage";
import AssetTypeListPage from "../pages/AssetTypeListPage";
import ProjectListPage from "../pages/ProjectListPage";
import AccountListPage from "../pages/AccountListPage";
import EmailConfigListPage from "../pages/EmailConfigListPage";
import EmailRecipientListPage from "../pages/EmailRecipientListPage";
import AssetTypeNotificationListPage from "../pages/AssetTypeNotificationListPage";
import AssetNotificationListPage from "../pages/AssetNotificationListPage";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import UserListPage from "../pages/UserListPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected App Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Default index route: Mặc định hiển thị HomePage (Dashboard) cho cả Admin và User */}
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Tài sản: Cả Admin và User đều xem được */}
          <Route path="asset" element={<AssetListPage />} />

          {/* Các route yêu cầu quyền Admin */}
          <Route
            path="company"
            element={
              <ProtectedRoute requireAdmin>
                <CompanyListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="assettype"
            element={
              <ProtectedRoute requireAdmin>
                <AssetTypeListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="project"
            element={
              <ProtectedRoute requireAdmin>
                <ProjectListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="account"
            element={
              <ProtectedRoute requireAdmin>
                <AccountListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute requireAdmin>
                <UserListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="emailconfig"
            element={
              <ProtectedRoute requireAdmin>
                <EmailConfigListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="emailrecipient"
            element={
              <ProtectedRoute requireAdmin>
                <EmailRecipientListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="assettypenotification"
            element={
              <ProtectedRoute requireAdmin>
                <AssetTypeNotificationListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="assetnotification"
            element={
              <ProtectedRoute requireAdmin>
                <AssetNotificationListPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
