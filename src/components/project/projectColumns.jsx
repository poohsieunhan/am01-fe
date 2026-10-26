// src/components/project/projectColumns.jsx

export const projectColumns = [
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "Name",
    header: "TÊN DỰ ÁN",
    accessor: "Name",
    tdClassName: "font-medium text-slate-900",
  },
  {
    id: "Address",
    header: "ĐỊA CHỈ",
    accessor: "Address",
    tdClassName: "whitespace-normal break-words",
  },
];
