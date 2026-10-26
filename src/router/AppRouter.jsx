import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
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

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bọc tất cả trong MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Mặc định vào "/" sẽ hiện danh sách Công ty */}
          <Route index element={<HomePage />} />
          <Route path="company" element={<CompanyListPage />} />
          <Route path="asset" element={<AssetListPage />} />
          <Route path="assettype" element={<AssetTypeListPage />} />
          <Route path="project" element={<ProjectListPage />} />
          <Route path="account" element={<AccountListPage />} />
          <Route path="emailconfig" element={<EmailConfigListPage />} />
          <Route path="emailrecipient" element={<EmailRecipientListPage />} />
          <Route
            path="assettypenotification"
            element={<AssetTypeNotificationListPage />}
          />
          <Route
            path="assetnotification"
            element={<AssetNotificationListPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
