function FormDateInput({ id, name, label, value, onChange, error }) {
  const inputBaseClass =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 focus:ring-2";
  const normalInputClass =
    "border-gray-200 focus:border-gray-400 focus:ring-gray-200";
  const errorInputClass =
    "border-red-300 focus:border-red-400 focus:ring-red-100";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        className={`${inputBaseClass} ${
          error ? errorInputClass : normalInputClass
        }`}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default FormDateInput;
