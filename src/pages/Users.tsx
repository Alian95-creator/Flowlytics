import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);

    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      setError(error.message);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      <div className="bg-white rounded shadow">
        {users.map((u) => (
          <div key={u.id} className="p-3 border-b">
            {u.name} - {u.plan}
          </div>
        ))}
      </div>
    </div>
  );
}