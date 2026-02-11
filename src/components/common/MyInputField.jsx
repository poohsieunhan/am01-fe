function MyInputField({
  label,
  name,
  value,
  onChange,
  type = "text",        // chỉ dùng khi as = "input"
  as = "input",         // "input" | "textarea" | "select"
  options = [],         // chỉ dùng khi as = "select"
  checked,              // chỉ dùng khi input type="checkbox"
  placeholder,
  rows = 3,             // default cho textarea
  className = "",
  ...rest               // nhận thêm props như disabled, min, max, etc.
}) {
  const isCheckbox = as === "input" && type === "checkbox";

  const baseInputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

  const selectClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

  const textareaClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 " +
    "resize-none";

  return (
    <div className="space-y-1">
      {/* LABEL (checkbox sẽ hiển thị khác) */}
      {!isCheckbox && label && (
        <label className="text-sm font-medium text-slate-700" htmlFor={name}>
          {label}
        </label>
      )}

      {as === "select" && (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${selectClass} ${className}`}
          {...rest}
        >
          {/* Option mặc định */}
          <option value="">-- Chọn --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {as === "textarea" && (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={`${textareaClass} ${className}`}
          {...rest}
        />
      )}

      {as === "input" && !isCheckbox && (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInputClass} ${className}`}
          {...rest}
        />
      )}

      {isCheckbox && (
        <div className="flex items-center gap-2">
          <input
            id={name}
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={onChange}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            {...rest}
          />
          {/* Checkbox label nằm ngang bên phải */}
          {label && (
            <label
              htmlFor={name}
              className="text-sm font-medium text-slate-700"
            >
              {label}
            </label>
          )}
        </div>
      )}
    </div>
  );
}

export default MyInputField;
