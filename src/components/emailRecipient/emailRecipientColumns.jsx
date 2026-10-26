// src/components/emailRecipient/emailRecipientColumns.jsx

const renderActive = (active) => {
  const isAct = Boolean(active);
  if (isAct) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
        Đang nhận mail
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
      Tạm dừng
    </span>
  );
};

export const emailRecipientColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "Name",
    header: "TÊN NGƯỜI NHẬN",
    accessor: "Name",
    tdClassName: "font-medium text-slate-900",
  },
  {
    id: "Email",
    header: "ĐỊA CHỈ EMAIL",
    accessor: "Email",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap font-medium text-indigo-600",
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
