export default function Header() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Track your business performance
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          className="border px-3 py-1 rounded"
          placeholder="Search..."
        />
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}