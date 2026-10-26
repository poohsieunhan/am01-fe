// src/components/assetNotification/assetNotificationColumns.jsx

const formatDate = (val) => {
  if (!val) return "Chưa gửi";
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleString("vi-VN");
  } catch {
    return val;
  }
};

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

export const assetNotificationColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "AssetId",
    header: "TÀI SẢN (ID)",
    accessor: "AssetId",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap font-medium text-slate-800 text-center",
  },
  {
    id: "NotifyBeforeDays",
    header: "BÁO TRƯỚC (NGÀY)",
    accessor: (row) => `${row.NotifyBeforeDays} ngày`,
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap font-medium text-indigo-600 text-center",
  },
  {
    id: "NotifyOnExpire",
    header: "BÁO ĐÚNG NGÀY HẾT HẠN",
    accessor: "NotifyOnExpire",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, val) => (val ? "Có" : "Không"),
  },
  {
    id: "LastSentAt",
    header: "LẦN GỬI GẦN NHẤT",
    accessor: "LastSentAt",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center text-slate-500",
    cell: (_row, val) => formatDate(val),
  },
  {
    id: "Active",
    header: "TRẠNG THÁI",
    accessor: "Active",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, val) => renderActive(val),
  },
];
