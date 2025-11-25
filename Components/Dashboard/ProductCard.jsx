export default function ProductCard({ p }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="h-40 w-full bg-gray-100 flex items-center justify-center">
        {p.image ? (
          // next/image would be better in production
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-sm text-gray-400">No image</div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-800">{p.name}</div>
          <div className="text-xs text-gray-500 mt-1">{p.category}</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">₹{p.price}</div>
          <button className="text-xs bg-[#008236] text-white px-3 py-1 rounded-md">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
