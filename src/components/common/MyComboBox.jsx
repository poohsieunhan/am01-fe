import { useState, useMemo, useRef, useEffect } from "react";

function MyComboBox({
  label,
  name,
  value,
  options = [],       // [{ value: 1, label: "ABC" }]
  placeholder = "Chọn dữ liệu",
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const boxRef = useRef(null);

  // đóng khi click ra ngoài
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = useMemo(
    () => options.find((o) => o.value === value) || null,
    [options, value]
  );

  const filtered = useMemo(() => {
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const handleSelect = (item) => {
    onChange?.({
      target: {
        name,
        value: item.value,
      },
    });
    setOpen(false);
  };

  return (
    <div className="space-y-1 text-left" ref={boxRef}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Button mở dropdown */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full px-3 py-2 text-left text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {selected ? selected.label : placeholder}
        </button>

        {open && (
          <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg">
            {/* ô tìm kiếm */}
            <div className="p-2 border-b border-slate-200">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full px-2 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* danh sách */}
            <ul className="max-h-56 overflow-y-auto text-sm">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-slate-400">
                  Không có dữ liệu
                </li>
              )}
              {filtered.map((item) => (
                <li
                  key={item.value}
                  onClick={() => handleSelect(item)}
                  className="px-3 py-2 cursor-pointer hover:bg-slate-100"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComboBox;
