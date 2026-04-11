import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Skeleton from "../components/Skeleton";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, users]);

  async function fetchUsers() {
    setLoading(true);

    const { data, error } = await supabase.from("users").select("*");

    if (!error && data) {
      setUsers(data);
      setFilteredUsers(data);
    }

    setLoading(false);
  }

  function handleSearch() {
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
    setPage(1);
  }

  // pagination logic
  const start = (page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  if (loading) {
    return (
      <div className="p-6">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Users</h1>

      {/* SEARCH */}
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      <div className="bg-white rounded shadow">
        {paginatedUsers.map((u) => (
          <div key={u.id} className="p-3 border-b">
            <div className="font-medium">{u.name}</div>
            <div className="text-sm text-gray-500">
              {u.email} • {u.plan}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded hover:bg-gray-100 transition"
        >
          Prev
        </button>

        <span className="px-2">
          {page} / {totalPages || 1}
        </span>

        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          className="px-3 py-1 border rounded hover:bg-gray-100 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}