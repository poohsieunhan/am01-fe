function SearchInput({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = "Tìm kiếm...",
  className = "",

  // NEW
  showDateRange = false,
  fromDate,
  toDate,
  onChangeFromDate,
  onChangeToDate,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ value, fromDate, toDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      {/* Ô search text */}
      <div className="relative flex-1 min-w-[220px]">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-9 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute bg-red-100 inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* NEW: Date range */}
      {showDateRange && (
        <>
          <input
            type="date"
            value={fromDate || ""}
            onChange={(e) => onChangeFromDate?.(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-slate-400 text-sm">→</span>
          <input
            type="date"
            value={toDate || ""}
            onChange={(e) => onChangeToDate?.(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 px-3 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </>
      )}

      <button
        type="submit"
        className="hidden md:inline-flex px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
      >
        Tìm
      </button>
    </form>
  );
}

export default SearchInput;
