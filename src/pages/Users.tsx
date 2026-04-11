import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from("users").select("*");

    if (error) console.error(error);
    else setUsers(data);
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