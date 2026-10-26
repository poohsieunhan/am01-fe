// src/components/assetType/assetTypeColumns.jsx

const renderHasExpire = (hasExpire) => {
  const isExp = Boolean(hasExpire);
  if (isExp) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        Có
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
      Không
    </span>
  );
};

export const assetTypeColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "Code",
    header: "MÃ LOẠI TÀI SẢN",
    accessor: "Code",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap font-medium text-slate-800 text-center",
  },
  {
    id: "Name",
    header: "TÊN LOẠI TÀI SẢN",
    accessor: "Name",
    tdClassName: "font-medium text-slate-900",
  },
  {
    id: "HasExpire",
    header: "CÓ HẠN SỬ DỤNG",
    accessor: "HasExpire",
    thClassName: "whitespace-nowrap text-center",
    tdClassName: "whitespace-nowrap text-center",
    cell: (_row, value) => renderHasExpire(value),
  },
];
