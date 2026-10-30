// src/components/user/userColumns.jsx

const renderRoleBadge = (role) => {
  const numRole = Number(role);
  if (numRole === 1) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
        Quản trị viên (Admin)
      </span>
    );
  }
  if (numRole === 2) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        Người dùng (User)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
      Quyền #{role ?? "-"}
    </span>
  );
};

export const userColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "LoginName",
    header: "TÊN ĐĂNG NHẬP",
    accessor: "LoginName",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap font-medium text-slate-900 font-mono",
  },
  {
    id: "Role",
    header: "VAI TRÒ / QUYỀN",
    accessor: "Role",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, value) => renderRoleBadge(value),
  },
  {
    id: "Password",
    header: "MẬT KHẨU",
    accessor: "Password",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap font-mono text-center text-slate-400",
    cell: () => "••••••••",
  },
];
