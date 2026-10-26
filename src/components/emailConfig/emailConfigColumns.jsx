// src/components/emailConfig/emailConfigColumns.jsx

const renderActive = (active) => {
  const isAct = Boolean(active);
  if (isAct) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
        Hoạt động
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
      Tắt
    </span>
  );
};

export const emailConfigColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "Provider",
    header: "NHÀ CUNG CẤP",
    accessor: "Provider",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap font-medium text-slate-800 text-center",
  },
  {
    id: "Host",
    header: "HOST & PORT",
    accessor: (row) => `${row.Host}:${row.Port} (${row.Secure})`,
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap font-mono text-sm",
  },
  {
    id: "FromEmail",
    header: "EMAIL GỬI",
    accessor: "FromEmail",
    tdClassName: "font-medium text-slate-900",
  },
  {
    id: "FromName",
    header: "TÊN HIỂN THỊ",
    accessor: "FromName",
  },
  {
    id: "Active",
    header: "TRẠNG THÁI",
    accessor: "Active",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, value) => renderActive(value),
  },
];
