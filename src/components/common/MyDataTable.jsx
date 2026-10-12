function MyDataTable({
  columns = [],
  data = [],
  renderActions,
  pagination,
  onChangePage,
  emptyText = "Không có dữ liệu.",
  actionsHeader = "THAO TÁC",
  rowKey = (row) => row?.Id ?? row?.id ?? row?._id,
}) {
  const hasActions = typeof renderActions === "function";

  const hasPagination =
    pagination &&
    typeof pagination.page === "number" &&
    typeof pagination.totalPages === "number";

  const page = hasPagination ? pagination.page : 1;
  const limit = hasPagination
    ? Number(pagination.limit || data.length || 0)
    : data.length || 0;

  // Lọc bỏ null/undefined
  const cleanedData = Array.isArray(data)
    ? data.filter((row) => row !== null && row !== undefined)
    : [];

  // Offset để tính STT global
  const startIndexOffset = (page - 1) * (limit || 0);

  const getCellValue = (col, row, rowIndex, displayIndex) => {
    if (typeof col.accessor === "function") {
      return col.accessor(row, rowIndex, displayIndex);
    }
    if (col.accessor) {
      return row[col.accessor];
    }
    if (col.id) {
      return row[col.id];
    }
    return undefined;
  };

  const handlePrevPage = () => {
    if (!hasPagination || pagination.page <= 1) return;
    onChangePage && onChangePage(pagination.page - 1);
  };

  const handleNextPage = () => {
    if (!hasPagination || pagination.page >= pagination.totalPages) return;
    onChangePage && onChangePage(pagination.page + 1);
  };

  return (
    <div className="mt-6 overflow-x-auto w-full">
      <div className="inline-block min-w-full align-middle rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full text-sm text-slate-700 border border-slate-200 border-collapse bg-white">
          {/* HEADER */}
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  // 👈 Key linh hoạt hơn, tránh warning
                  key={col.id || col.accessor || `col-${index}`}
                  className={`px-4 py-2 border border-slate-200 text-center text-xs font-semibold text-slate-500 ${
                    col.thClassName || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}

              {hasActions && (
                <th className="px-4 py-2 border border-slate-200 text-center text-xs font-semibold text-slate-500 whitespace-nowrap">
                  {actionsHeader}
                </th>
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {cleanedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-4 py-6 border border-slate-200 text-center text-slate-500"
                >
                  {emptyText}
                </td>
              </tr>
            )}

            {cleanedData.map((row, rowIndex) => {
              const displayIndex = startIndexOffset + rowIndex + 1;

              // Lấy key cho row từ hàm rowKey
              const keyVal =
                typeof rowKey === "function" ? rowKey(row) : row[rowKey];
              const finalRowKey = keyVal ?? `row-${rowIndex}`;

              return (
                <tr
                  key={finalRowKey}
                  className="odd:bg-white even:bg-slate-100 hover:bg-slate-300 transition-colors"
                >
                  {columns.map((col, colIndex) => {
                    const rawValue = getCellValue(
                      col,
                      row,
                      rowIndex,
                      displayIndex,
                    );

                    const content = col.cell
                      ? col.cell(row, rawValue, rowIndex, displayIndex)
                      : (rawValue ?? "-");

                    return (
                      <td
                        key={col.id || col.accessor || `cell-${colIndex}`}
                        className={`px-4 py-2 border border-slate-200 align-top bg-transparent ${
                          col.tdClassName || ""
                        }`}
                      >
                        {content}
                      </td>
                    );
                  })}

                  {hasActions && (
                    <td className="px-4 py-2 border border-slate-200 align-top">
                      <div className="flex justify-end gap-2">
                        {renderActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {hasPagination && (
        <div className="mt-4 flex items-center justify-end gap-3 text-sm text-slate-700">
          <button
            type="button"
            disabled={pagination.page <= 1}
            onClick={handlePrevPage}
            className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trang trước
          </button>

          <span>
            Trang {pagination.page} / {Math.max(1, pagination.totalPages || 0)}
          </span>

          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={handleNextPage}
            className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}

export default MyDataTable;
