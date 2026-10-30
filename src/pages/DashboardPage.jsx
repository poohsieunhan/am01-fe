import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Clock,
  Boxes,
  CheckCircle2,
  RefreshCw,
  Search,
  Building2,
  FolderKanban,
  User,
  ArrowRight,
  ShieldAlert,
  FileSpreadsheet,
  Mail,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import assetApi from "../services/assetApi";
import { renderAssetTypeBadge } from "../components/asset/assetColumns";

export default function DashboardPage() {
  const [days, setDays] = useState(30);
  const [customDays, setCustomDays] = useState("");
  const [activeTab, setActiveTab] = useState("expiring"); // "expiring" | "expired" | "all_warning"
  const [loading, setLoading] = useState(true);
  const [sendingMail, setSendingMail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [summary, setSummary] = useState({
    totalAssets: 0,
    expiredCount: 0,
    expiringCount: 0,
    days: 30,
  });
  const [assets, setAssets] = useState([]);

  // Fetch dữ liệu từ API
  const fetchData = async (selectedDays = days, type = activeTab, search = searchTerm) => {
    try {
      setLoading(true);
      const res = await assetApi.getExpiring({
        days: selectedDays,
        type: type,
        limit: 100,
        search: search || undefined,
      });

      if (res) {
        setSummary(
          res.summary || {
            totalAssets: 0,
            expiredCount: 0,
            expiringCount: 0,
            days: selectedDays,
          }
        );
        setAssets(res.data || []);
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(days, activeTab, searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [days, activeTab, searchTerm]);

  const handleSelectDays = (val) => {
    setDays(val);
    setCustomDays("");
  };

  const handleApplyCustomDays = (e) => {
    e.preventDefault();
    const val = parseInt(customDays, 10);
    if (!isNaN(val) && val > 0) {
      setDays(val);
    }
  };

  // Tính số ngày còn lại hoặc đã quá hạn
  const getExpiryStatus = (expireDateStr) => {
    if (!expireDateStr) return { text: "Không rõ", badgeClass: "bg-slate-100 text-slate-600" };
    const expireDate = new Date(expireDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expireDate.setHours(0, 0, 0, 0);

    const diffTime = expireDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `Đã quá hạn ${Math.abs(diffDays)} ngày`,
        badgeClass: "bg-rose-100 text-rose-800 border border-rose-300 font-semibold",
        isExpired: true,
      };
    } else if (diffDays === 0) {
      return {
        text: "Hết hạn hôm nay",
        badgeClass: "bg-red-500 text-white font-bold animate-pulse",
        isExpired: false,
      };
    } else if (diffDays <= 7) {
      return {
        text: `Còn ${diffDays} ngày`,
        badgeClass: "bg-red-100 text-red-800 font-bold border border-red-200",
        isExpired: false,
      };
    } else if (diffDays <= 30) {
      return {
        text: `Còn ${diffDays} ngày`,
        badgeClass: "bg-amber-100 text-amber-800 font-medium border border-amber-200",
        isExpired: false,
      };
    } else {
      return {
        text: `Còn ${diffDays} ngày`,
        badgeClass: "bg-blue-100 text-blue-800 font-medium border border-blue-200",
        isExpired: false,
      };
    }
  };

  // Filter danh sách theo ô tìm kiếm
  const filteredAssets = useMemo(() => {
    if (!searchTerm.trim()) return assets;
    const q = searchTerm.toLowerCase();
    return assets.filter((item) => {
      const name = (item.Name || "").toLowerCase();
      const code = (item.Code || "").toLowerCase();
      const type = (item.assetTypeId?.Name || "").toLowerCase();
      const comp = (item.company?.TenCongTy || "").toLowerCase();
      const proj = (item.project?.Name || "").toLowerCase();
      const acc = (item.account?.Name || "").toLowerCase();
      return (
        name.includes(q) ||
        code.includes(q) ||
        type.includes(q) ||
        comp.includes(q) ||
        proj.includes(q) ||
        acc.includes(q)
      );
    });
  }, [assets, searchTerm]);

  // Tài sản an toàn
  const safeCount = Math.max(
    0,
    summary.totalAssets - summary.expiredCount - summary.expiringCount
  );

  // Gửi email thông báo tài sản hết hạn / sắp hết hạn theo mẫu cronjob của BE
  const handleSendNotificationMail = async () => {
    let typeText = "sắp hết hạn";
    let count = summary.expiringCount;
    if (activeTab === "expired") {
      typeText = "đã quá hạn";
      count = summary.expiredCount;
    } else if (activeTab === "all_warning") {
      typeText = "quá hạn và sắp hết hạn";
      count = summary.expiredCount + summary.expiringCount;
    }

    if (count === 0) {
      toast.error(`Không có tài sản nào ${typeText} (trạng thái đang sử dụng) để gửi email.`);
      return;
    }

    const confirmMessage = `Bạn có chắc chắn muốn gửi email thông báo cho ${count} tài sản ${typeText} (trạng thái đang sử dụng)?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      setSendingMail(true);
      const res = await assetApi.sendNotificationMail({
        type: activeTab,
        days: days,
      });

      const msg =
        res?.metadata?.message ||
        res?.message ||
        `Đã gửi email cảnh báo tài sản ${typeText} thành công!`;
      toast.success(msg, { duration: 5000 });
    } catch (err) {
      console.error("Lỗi khi gửi email thông báo:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gặp lỗi khi gửi email thông báo. Vui lòng kiểm tra cấu hình Email.";
      toast.error(msg, { duration: 5000 });
    } finally {
      setSendingMail(false);
    }
  };

  // Xuất file Excel danh sách tài sản hiển thị trên grid
  const handleExportExcel = () => {
    if (!filteredAssets || filteredAssets.length === 0) {
      toast.error("Không có dữ liệu trong danh sách để xuất Excel!");
      return;
    }

    try {
      const rows = filteredAssets.map((asset, idx) => {
        const status = getExpiryStatus(asset.ExpireDate);
        return {
          STT: idx + 1,
          "Mã tài sản": asset.Code || "",
          "Tên tài sản": asset.Name || "",
          "Loại tài sản": asset.assetTypeId?.Name || "",
          "Công ty": asset.company?.TenCongTy || "",
          "Dự án": asset.project?.Name || "",
          "Tài khoản": asset.account?.Name || "",
          "Ngày hết hạn": asset.ExpireDate
            ? new Date(asset.ExpireDate).toLocaleDateString("vi-VN")
            : "Không xác định",
          "Tình trạng": status.text || "",
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(rows);

      // Định dạng độ rộng cột
      worksheet["!cols"] = [
        { wch: 6 },  // STT
        { wch: 15 }, // Mã tài sản
        { wch: 32 }, // Tên tài sản
        { wch: 20 }, // Loại tài sản
        { wch: 30 }, // Công ty
        { wch: 25 }, // Dự án
        { wch: 20 }, // Tài khoản
        { wch: 16 }, // Ngày hết hạn
        { wch: 22 }, // Tình trạng
      ];

      const workbook = XLSX.utils.book_new();
      const sheetName =
        activeTab === "expiring"
          ? "SapHetHan"
          : activeTab === "expired"
          ? "DaHetHan"
          : "CanXuLy";
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const filename = `Danh_sach_tai_san_${sheetName}_${dateStr}.xlsx`;

      XLSX.writeFile(workbook, filename);
      toast.success(`Đã xuất ${filteredAssets.length} tài sản ra file Excel!`);
    } catch (error) {
      console.error("Lỗi khi xuất file Excel:", error);
      toast.error("Có lỗi xảy ra khi tạo file Excel!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* HEADER & FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Boxes size={24} />
              </span>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Bảng Điều Khiển Tài Sản
                </h1>
                <p className="text-sm text-slate-500">
                  Theo dõi tình trạng hạn sử dụng và cảnh báo tài sản
                </p>
              </div>
            </div>
          </div>

          {/* Bộ chọn số ngày cảnh báo */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase px-2 flex items-center gap-1">
              <Clock size={14} /> Mốc cảnh báo:
            </span>

            {[15, 30, 60, 90].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleSelectDays(d)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${days === d && !customDays
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {d} ngày
              </button>
            ))}

            {/* Nhập số ngày tùy ý */}
            <form onSubmit={handleApplyCustomDays} className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                max="365"
                placeholder="Khác..."
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                className="w-16 px-2 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              />
              <button
                type="submit"
                className="px-2 py-1 text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition"
              >
                Lọc
              </button>
            </form>

            {/* Nút Làm mới */}
            <button
              type="button"
              onClick={() => fetchData(days, activeTab)}
              disabled={loading}
              title="Làm mới dữ liệu"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition ml-1"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Sắp hết hạn (Nổi bật nhất) */}
        <div
          onClick={() => setActiveTab("expiring")}
          className={`cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50 border rounded-xl p-5 shadow-sm transition hover:shadow-md ${activeTab === "expiring"
              ? "ring-2 ring-amber-500 border-amber-400"
              : "border-amber-200"
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Sắp hết hạn ({days} ngày)
              </p>
              <h3 className="text-3xl font-extrabold text-amber-900 mt-2">
                {loading ? "..." : summary.expiringCount}
              </h3>
            </div>
            <div className="p-3 bg-amber-500 text-white rounded-xl shadow-sm">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-amber-700 font-medium">
            <span>Cần lên kế hoạch gia hạn</span>
            <ArrowRight size={14} className="ml-1" />
          </div>
        </div>

        {/* Card 2: Đã quá hạn */}
        <div
          onClick={() => setActiveTab("expired")}
          className={`cursor-pointer bg-gradient-to-br from-rose-50 to-red-50 border rounded-xl p-5 shadow-sm transition hover:shadow-md ${activeTab === "expired"
              ? "ring-2 ring-rose-500 border-rose-400"
              : "border-rose-200"
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
                Đã quá hạn
              </p>
              <h3 className="text-3xl font-extrabold text-rose-900 mt-2">
                {loading ? "..." : summary.expiredCount}
              </h3>
            </div>
            <div className="p-3 bg-rose-500 text-white rounded-xl shadow-sm">
              <ShieldAlert size={24} />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-rose-700 font-medium">
            <span>Đã hết hạn sử dụng</span>
            <ArrowRight size={14} className="ml-1" />
          </div>
        </div>

        {/* Card 3: Tài sản an toàn */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Hạn sử dụng an toàn
              </p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">
                {loading ? "..." : safeCount}
              </h3>
            </div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Còn hạn trên {days} ngày
          </p>
        </div>

        {/* Card 4: Tổng số tài sản */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tổng số tài sản
              </p>
              <h3 className="text-3xl font-extrabold text-indigo-600 mt-2">
                {loading ? "..." : summary.totalAssets}
              </h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Boxes size={24} />
            </div>
          </div>
          <Link
            to="/asset"
            className="mt-3 inline-flex items-center text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Xem tất cả tài sản <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header & Tabs */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("expiring")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${activeTab === "expiring"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              Sắp hết hạn ({summary.expiringCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("expired")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${activeTab === "expired"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              Đã hết hạn ({summary.expiredCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("all_warning")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${activeTab === "all_warning"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              Tất cả cần xử lý ({summary.expiringCount + summary.expiredCount})
            </button>
          </div>

          {/* Ô tìm kiếm nhanh, Gửi mail & Nút xuất Excel */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Tìm theo tên, mã, loại tài sản..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Nút gửi mail cảnh báo - hỗ trợ cả 3 tab: expiring, expired, all_warning */}
            <button
              type="button"
              onClick={handleSendNotificationMail}
              disabled={sendingMail || filteredAssets.length === 0}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-white shadow-sm transition whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTab === "expired"
                  ? "bg-rose-600 hover:bg-rose-700 active:bg-rose-800"
                  : activeTab === "all_warning"
                  ? "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                  : "bg-amber-600 hover:bg-amber-700 active:bg-amber-800"
              }`}
              title={`Gửi email thông báo danh sách tài sản ${
                activeTab === "expired"
                  ? "đã hết hạn"
                  : activeTab === "all_warning"
                  ? "quá hạn và sắp hết hạn"
                  : "sắp hết hạn"
              } (trạng thái đang sử dụng)`}
            >
              {sendingMail ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Đang gửi mail...</span>
                </>
              ) : (
                <>
                  <Mail size={14} />
                  <span>
                    {activeTab === "expired"
                      ? "Gửi mail Đã hết hạn"
                      : activeTab === "all_warning"
                      ? "Gửi mail Quá hạn & Sắp hết hạn"
                      : "Gửi mail Sắp hết hạn"}
                  </span>
                </>
              )}
            </button>

            {/* Nút Xuất Excel */}
            <button
              type="button"
              onClick={handleExportExcel}
              disabled={filteredAssets.length === 0}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition whitespace-nowrap cursor-pointer"
              title="Xuất danh sách hiện tại ra file Excel"
            >
              <FileSpreadsheet size={14} />
              <span>Xuất Excel</span>
            </button>
          </div>
        </div>

        {/* Table content */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <RefreshCw size={28} className="animate-spin mx-auto text-indigo-500 mb-2" />
              <p className="text-sm">Đang tải danh sách tài sản...</p>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
              <p className="text-base font-semibold text-slate-700">
                Không có tài sản nào trong mục này!
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Tất cả tài sản đều đang trong trạng thái an toàn hoặc không khớp với từ khóa tìm kiếm.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3 text-center w-12">STT</th>
                  <th className="py-3 px-4">Mã tài sản</th>
                  <th className="py-3 px-4">Tên tài sản</th>
                  <th className="py-3 px-4">Loại tài sản</th>
                  <th className="py-3 px-4">Công ty / Dự án</th>
                  <th className="py-3 px-4">Tài khoản</th>
                  <th className="py-3 px-4 text-center">Ngày hết hạn</th>
                  <th className="py-3 px-4 text-center">Tình trạng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssets.map((asset, idx) => {
                  const status = getExpiryStatus(asset.ExpireDate);
                  return (
                    <tr
                      key={asset.Id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3 px-3 text-center text-slate-400 font-medium">
                        {idx + 1}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-indigo-700">
                        {asset.Code || "-"}
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-900 max-w-[220px] truncate" title={asset.Name}>
                        {asset.Name}
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        {renderAssetTypeBadge(asset, asset.assetTypeId?.Name)}
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        <div className="flex flex-col gap-0.5">
                          {asset.company?.TenCongTy && (
                            <span className="flex items-center gap-1 font-medium text-slate-800">
                              <Building2 size={12} className="text-slate-400" />
                              {asset.company.TenCongTy}
                            </span>
                          )}
                          {asset.project?.Name && (
                            <span className="flex items-center gap-1 text-[11px] text-slate-500">
                              <FolderKanban size={11} className="text-slate-400" />
                              {asset.project.Name}
                            </span>
                          )}
                          {!asset.company?.TenCongTy && !asset.project?.Name && "-"}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        {asset.account?.Name ? (
                          <span className="flex items-center gap-1">
                            <User size={12} className="text-slate-400" />
                            {asset.account.Name}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="py-3 px-4 text-center font-semibold text-slate-800">
                        {asset.ExpireDate
                          ? new Date(asset.ExpireDate).toLocaleDateString("vi-VN")
                          : "Không xác định"}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] ${status.badgeClass}`}
                        >
                          {status.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Hiển thị <b>{filteredAssets.length}</b> tài sản
          </span>
          <Link
            to="/asset"
            className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
          >
            Quản lý tất cả tài sản <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
