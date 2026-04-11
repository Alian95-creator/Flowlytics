import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useOnlineUsers(user: any) {
  useEffect(() => {
    if (!user) return;

    const upsertUser = async () => {
      await supabase.from("online_users").upsert({
        email: user.email,
        last_active: new Date().toISOString(),
      });
    };

    upsertUser();

    const interval = setInterval(upsertUser, 15000);

    window.addEventListener("beforeunload", async () => {
      await supabase
        .from("online_users")
        .delete()
        .eq("email", user.email);
    });

    return () => clearInterval(interval);
  }, [user]);
}