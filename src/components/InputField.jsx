export default function InputField({
  label,
  value,
  readOnly,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-400">
        {label}
      </label>

      <input
        type="text"
        value={value || ""}
        readOnly={readOnly}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
      />
    </div>
  );
}