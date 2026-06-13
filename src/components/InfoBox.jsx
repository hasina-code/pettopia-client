export default function InfoBox({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
      {Icon && (
        <div className="text-pink-500 text-xl">
          <Icon />
        </div>
      )}

      <div>
        <p className="text-gray-400 text-xs">
          {label}
        </p>

        <h3 className="font-semibold">
          {value}
        </h3>
      </div>
    </div>
  );
}