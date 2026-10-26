// src/components/asset/assetColumns.jsx

const formatDate = (val) => {
  if (!val) return "-";
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString("vi-VN");
  } catch {
    return val;
  }
};

const renderStatus = (status) => {
  const numStatus = Number(status);
  if (numStatus === 1) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
        Đang sử dụng
      </span>
    );
  }
  if (numStatus === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
        Ngưng sử dụng
      </span>
    );
  }
  if (numStatus === 2) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        Bảo trì
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
      {status ?? "-"}
    </span>
  );
};

export const assetColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "Code",
    header: "MÃ TÀI SẢN",
    accessor: "Code",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap font-medium text-slate-800",
  },
  {
    id: "Name",
    header: "TÊN TÀI SẢN",
    accessor: "Name",
    tdClassName: "font-medium text-slate-900",
  },
  {
    id: "AssetTypeId",
    header: "LOẠI TÀI SẢN",
    accessor: (row) => row.assetTypeId?.Name || row.AssetTypeId || "-",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
  },
  {
    id: "Company",
    header: "CÔNG TY",
    accessor: (row) => row.company?.TenCongTy || row.CompanyId || "-",
    tdClassName: "whitespace-normal break-words",
  },
  {
    id: "Account",
    header: "NGƯỜI PHỤ TRÁCH",
    accessor: (row) =>
      row.account?.Name
        ? `${row.account.Name} (${row.account.Username})`
        : row.account?.Name || row.AccountId || "-",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "Project",
    header: "DỰ ÁN",
    accessor: (row) => row.project?.Name || "-",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap text-slate-700",
  },
  {
    id: "Status",
    header: "TRẠNG THÁI",
    accessor: "Status",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, value) => renderStatus(value),
  },
  {
    id: "StartDate",
    header: "NGÀY BẮT ĐẦU",
    accessor: "StartDate",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, value) => formatDate(value),
  },
  {
    id: "ExpireDate",
    header: "NGÀY HẾT HẠN",
    accessor: "ExpireDate",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, value) => formatDate(value),
  },
  {
    id: "Description",
    header: "MÔ TẢ",
    accessor: "Description",
    tdClassName: "whitespace-normal break-words max-w-xs",
  },
];
