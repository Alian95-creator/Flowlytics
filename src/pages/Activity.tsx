import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Activity = {
  id: string;
  email: string;
  action: string;
  created_at: string;
};

export default function Activity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchInitial();

    const channel = supabase
      .channel("activity-logs")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "activity_logs",
        },
        (payload) => {
          setActivities((prev) => [
            payload.new as Activity,
            ...prev.slice(0, 9),
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchInitial() {
    const { data } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (data) setActivities(data);
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-green-400">
        Live Activity
      </h1>

      <div className="card-dark p-4 rounded-2xl space-y-3">
        {activities.map((a) => (
          <div
            key={a.id}
            className="flex justify-between p-3 border border-gray-800 rounded-lg bg-black/40"
          >
            <div>
              <p className="text-white text-sm">
                {a.action}
              </p>
              <p className="text-xs text-gray-500">
                {a.email}
              </p>
            </div>

            <span className="text-xs text-gray-500">
              {new Date(a.created_at).toLocaleTimeString()}
            </span>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="text-gray-500 text-sm">
            No activity yet...
          </p>
        )}
      </div>
    </div>
  );
}