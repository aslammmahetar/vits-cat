export default function StatCard({ title, value, subtitle, accent }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold"
          style={{
            backgroundColor: accent || "rgba(0,0,0,0.04)",
            color: accent ? "white" : "#111",
          }}
        >
          {subtitle}
        </div>
      </div>
      <div className="text-lg sm:text-2xl font-semibold text-gray-800">
        {value}
      </div>
    </div>
  );
}
