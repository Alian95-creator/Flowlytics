import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Activity() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();

    const channel = supabase
      .channel("activity")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activity_logs" },
        fetchLogs
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchLogs() {
    const { data } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setLogs(data);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Live Activity 🔥</h1>

      <div className="bg-white dark:bg-gray-900 dark:text-white rounded shadow transition">
        {logs.map((l) => (
          <div key={l.id} className="p-3 border-b text-sm">
            {l.email} → {l.action}
          </div>
        ))}
      </div>
    </div>
  );
}