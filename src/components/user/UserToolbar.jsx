import { Search, Plus, UserCog } from "lucide-react";

export default function UserToolbar({
  searchText,
  setSearchText,
  onAdd,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center">
              <UserCog className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-slate-800">
                Danh sách Người dùng (tblUser)
              </h1>
              <p className="truncate text-sm text-slate-500">
                Quản lý tài khoản đăng nhập và phân quyền hệ thống
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Tìm theo tên đăng nhập, vai trò..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-10 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
            {searchText?.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchText("")}
                className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onAdd}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 active:bg-indigo-700 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Thêm người dùng
          </button>
        </div>
      </div>
    </div>
  );
}
