import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useOnlineUsers(user: any, page: string) {
  useEffect(() => {
    if (!user) return;

    const updatePresence = async () => {
      await supabase.from("online_users").upsert({
        email: user.email,
        last_active: new Date().toISOString(),
        current_page: page,
      });

      await supabase.from("activity_logs").insert({
        email: user.email,
        action: `Viewing ${page}`,
      });
    };

    updatePresence();

    const interval = setInterval(updatePresence, 10000);

    window.addEventListener("beforeunload", async () => {
      await supabase
        .from("online_users")
        .delete()
        .eq("email", user.email);

      await supabase.from("activity_logs").insert({
        email: user.email,
        action: "Left app",
      });
    });

    return () => clearInterval(interval);
  }, [user, page]);
}