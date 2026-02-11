import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import CompanyListPage from "../pages/CompanyListPage";
import HomePage from "../pages/HomePage";
import DeviceListPage from "../pages/DeviceListPage";
import RequestFormPage from "../pages/RequestFormPage";
import RequestFormDetailPage from "../pages/RequestFormDetailPage";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bọc tất cả trong MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Mặc định vào "/" sẽ hiện danh sách Công ty */}
          <Route index element={<HomePage />} />
          <Route path="company" element={<CompanyListPage />} />
          <Route path="device" element={<DeviceListPage />} />"
          <Route path="requestform" element={<RequestFormPage />} />
          <Route path="requestformdetail/:id" element={<RequestFormDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
