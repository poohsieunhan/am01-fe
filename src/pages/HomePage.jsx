import DashboardPage from "./DashboardPage";

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Dashboard tài sản sắp hết hạn */}
      <DashboardPage />

      {/* Có thể nhúng thêm các dashboard/widget khác ở đây trong tương lai */}
    </div>
  );
}
