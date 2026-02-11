// src/components/company/companyColumns.js

export const companyColumns = [
  // {
  //   id: "Id",
  //   header: "ID",
  //   accessor: "Id",
  //   thClassName: "whitespace-nowrap text-center",
  //   tdClassName: "whitespace-nowrap text-center",
  // },
  {
    id: "stt",
    header: "STT",
    thClassName: "w-12 text-center",
    tdClassName: "text-center",
    cell: (_row, _value, _rowIndex, displayIndex) => displayIndex,
  },
  {
    id: "TenCongTy",
    header: "TÊN CÔNG TY",
    accessor: "TenCongTy",
  },
  {
    id: "DiaChi",
    header: "ĐỊA CHỈ",
    accessor: "DiaChi",
    tdClassName: "whitespace-normal break-words",
  },
  {
    id: "MaSoThue",
    header: "MÃ SỐ THUẾ",
    accessor: "MaSoThue",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "Email",
    header: "EMAIL",
    accessor: "Email",
    tdClassName: "break-all",
  },
  {
    id: "Tel",
    header: "SỐ ĐIỆN THOẠI",
    accessor: "Tel",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "Fax",
    header: "FAX",
    accessor: "Fax",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "NguoiDaiDien",
    header: "NGƯỜI ĐẠI ĐIỆN",
    accessor: "NguoiDaiDien",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
  {
    id: "ChucVu",
    header: "CHỨC VỤ",
    accessor: "ChucVu",
    thClassName: "whitespace-nowrap",
    tdClassName: "whitespace-nowrap",
  },
];
