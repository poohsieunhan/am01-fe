// src/components/account/accountColumns.jsx

export const accountColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "Name",
    header: "TÊN HIỂN THỊ",
    accessor: "Name",
    tdClassName: "font-medium text-slate-900",
  },
  {
    id: "Username",
    header: "TÊN ĐĂNG NHẬP",
    accessor: "Username",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap font-mono text-center text-slate-700",
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
