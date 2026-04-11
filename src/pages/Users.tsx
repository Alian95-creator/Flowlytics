import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel("presence")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "online_users" },
        fetchUsers
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("online_users").select("*");
    if (data) setUsers(data);
  }

  function getStatus(last_active: string) {
    const diff = Date.now() - new Date(last_active).getTime();
    return diff < 15000 ? "Online 🟢" : "Offline ⚫";
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Presence System ⚡</h1>

      <div className="bg-white dark:bg-gray-900 dark:text-white rounded shadow transition">
        {users.map((u) => (
          <div key={u.id} className="p-4 border-b">
            <p className="font-medium">{u.email}</p>
            <p className="text-sm text-gray-500">
              {getStatus(u.last_active)}
            </p>
            <p className="text-xs text-gray-400">
              {u.current_page}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}