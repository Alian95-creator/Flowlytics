export default function Users() {
  return (
    <div className="card-dark p-6 rounded-2xl">
      <h1 className="text-xl text-green-400 mb-4">Active Users</h1>

      <div className="space-y-2">
        {["User A", "User B", "User C"].map((u) => (
          <div
            key={u}
            className="p-3 border border-gray-800 rounded-lg"
          >
            {u} 🟢 online
          </div>
        ))}
      </div>
    </div>
  );
}