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

const ASSET_TYPE_PALETTE = [
  { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" }, // 1. Xanh dương (Blue)
  { bg: "#fce7f3", text: "#9d174d", border: "#f472b6" }, // 2. Hồng đậm (Pink)
  { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" }, // 3. Xanh ngọc lục bảo (Emerald)
  { bg: "#ffedd5", text: "#9a3412", border: "#fdba74" }, // 4. Cam (Orange)
  { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" }, // 5. Tím violet (Purple)
  { bg: "#cffafe", text: "#155e75", border: "#67e8f9" }, // 6. Xanh lơ (Cyan)
  { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" }, // 7. Vàng hổ phách (Amber)
  { bg: "#ccfbf1", text: "#115e59", border: "#5eead4" }, // 8. Xanh mòng két (Teal)
  { bg: "#fae8ff", text: "#86198f", border: "#f0abfc" }, // 9. Tím hồng (Fuchsia)
  { bg: "#ecfccb", text: "#3f6212", border: "#bef264" }, // 10. Xanh chanh (Lime)
  { bg: "#e0e7ff", text: "#3730a3", border: "#a5b4fc" }, // 11. Xanh chàm (Indigo)
  { bg: "#ffe4e6", text: "#9f1239", border: "#fda4af" }, // 12. Đỏ thắm (Rose)
];

export const getAssetTypeColor = (id, name) => {
  const numId = Number(id);
  if (!isNaN(numId) && numId > 0) {
    return ASSET_TYPE_PALETTE[(numId - 1) % ASSET_TYPE_PALETTE.length];
  }
  if (!name) return ASSET_TYPE_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return ASSET_TYPE_PALETTE[Math.abs(hash) % ASSET_TYPE_PALETTE.length];
};

export const renderAssetTypeBadge = (row, value) => {
  const name =
    value ||
    row?.assetTypeId?.Name ||
    row?.assetType?.Name ||
    (row?.AssetTypeId ? `Loại #${row.AssetTypeId}` : "-");

  if (!name || name === "-") {
    return <span className="text-slate-400 font-normal">-</span>;
  }

  // Lấy AssetTypeId chính xác nhất từ row
  const id =
    row?.AssetTypeId !== undefined && row?.AssetTypeId !== null && row?.AssetTypeId !== ""
      ? row.AssetTypeId
      : row?.assetTypeId?.Id !== undefined && row?.assetTypeId?.Id !== null
      ? row.assetTypeId.Id
      : row?.assetType?.Id !== undefined && row?.assetType?.Id !== null
      ? row.assetType.Id
      : 0;

  const color = getAssetTypeColor(id, name);

  return (
    <span
      style={{
        backgroundColor: color.bg,
        color: color.text,
        borderColor: color.border,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap shadow-xs"
    >
      {name}
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
    id: "AssetTypeId",
    header: "LOẠI TÀI SẢN",
    accessor: (row) => row.assetTypeId?.Name || row.AssetTypeId || "-",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (row, value) => renderAssetTypeBadge(row, value),
  },

  {
    id: "Account",
    header: "TÀI KHOẢN",
    accessor: (row) =>
      row.account?.Name,
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
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
    id: "Project",
    header: "DỰ ÁN",
    accessor: (row) => row.project?.Name || "-",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap text-slate-700",
  },
  {
    id: "Company",
    header: "CÔNG TY",
    accessor: (row) => row.company?.TenCongTy || row.CompanyId || "-",
    tdClassName: "whitespace-normal break-words",
  },
  {
    id: "Description",
    header: "MÔ TẢ",
    accessor: "Description",
    tdClassName: "whitespace-normal break-words max-w-xs",
  },
];
