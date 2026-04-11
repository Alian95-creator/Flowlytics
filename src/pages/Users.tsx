import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel("online-users")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "online_users",
        },
        () => {
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchUsers() {
    const { data } = await supabase
      .from("online_users")
      .select("*")
      .order("last_active", { ascending: false });

    if (data) setUsers(data);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Online Users ⚡</h1>

      <div className="bg-white rounded-2xl shadow border">
        {users.map((u) => (
          <div
            key={u.id}
            className="p-4 border-b flex justify-between"
          >
            <div>
              <p className="font-medium">{u.email}</p>
              <p className="text-sm text-gray-500">
                Active now
              </p>
            </div>

            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}