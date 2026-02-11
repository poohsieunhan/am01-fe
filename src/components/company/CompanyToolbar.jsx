import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

//lucide-react:
import {
  Search,
  Plus,
  FileDown,
  Upload,
  FileSpreadsheet,
  ChevronDown,
  X,
  Loader2,
} from "lucide-react";

export default function CompanyToolbar({
  searchText,
  setSearchText,
  onAdd, // openCreate
  onImportExcel, // async (formData) => void
  onDownloadTemplate, // async () => void
}) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [excelOpen, setExcelOpen] = useState(false);
  const [importing, setImporting] = useState(false);

  const fileName = useMemo(() => (file ? file.name : ""), [file]);

  const pickFile = () => fileInputRef.current?.click();

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImport = async () => {
    if (!file) return toast.error("Chưa chọn file Excel");

    try {
      setImporting(true);
      const fd = new FormData();
      fd.append("file", file);

      await onImportExcel(fd);

      //toast.success("Import thành công");
      clearFile();
      setExcelOpen(false);
    } catch (err) {
      toast.error("Import thất bại");
    } finally {
      setImporting(false);
    }
  };

  const handleDownload = async () => {
    try {
      await onDownloadTemplate();
      setExcelOpen(false);
    } catch (err) {
      toast.error("Không thể tải template");
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT: title + desc */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-slate-800">
                Danh sách Công ty
              </h1>
              <p className="truncate text-sm text-slate-500">
                Quản lý thông tin công ty: tên, địa chỉ, mã số thuế, liên hệ...
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: search + buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Tìm theo tên, MST, email, điện thoại..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-10 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
            {searchText?.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchText("")}
                className="absolute bg-red-100 inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Add */}
          <button
            onClick={onAdd}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 active:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Thêm công ty
          </button>

          {/* Excel dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExcelOpen((v) => !v)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              Excel
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {excelOpen && (
              <div className="absolute right-0 z-50 mt-2 w-[320px] rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-500">
                    TÁC VỤ EXCEL
                  </p>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />

                  {/* File selected pill */}
                  {file ? (
                    <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-emerald-800">
                          {fileName}
                        </p>
                        <p className="text-xs text-emerald-700">
                          Sẵn sàng để import
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="rounded-md p-1 hover:bg-emerald-100"
                        title="Bỏ chọn file"
                      >
                        <X className="h-4 w-4 text-emerald-800" />
                      </button>
                    </div>
                  ) : (
                    <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2">
                      <p className="text-sm text-slate-600">
                        Chọn file theo đúng template để import.
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={pickFile}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Upload className="h-4 w-4 text-slate-500" />
                      Chọn file
                    </button>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                    >
                      <FileDown className="h-4 w-4" />
                      Tải template
                    </button>

                    <button
                      type="button"
                      disabled={!file || importing}
                      onClick={handleImport}
                      className={`col-span-2 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white
                        ${
                          !file || importing
                            ? "bg-emerald-300"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }
                      `}
                    >
                      {importing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Đang import...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Import Excel
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Gợi ý: Tải template trước, điền dữ liệu đúng cột rồi import.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
