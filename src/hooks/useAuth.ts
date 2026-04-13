import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    // 1. initial session check
    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!alive) return;

        if (error) {
          console.error("Auth error:", error);
          setUser(null);
        } else {
          setUser(data.session?.user ?? null);
        }
      } catch (err) {
        console.error("Auth crash:", err);
        setUser(null);
      } finally {
        if (alive) setLoading(false);
      }
    };

    init();

    // 2. realtime auth listener (ONLY ONE)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!alive) return;

        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // 3. cleanup
    return () => {
      alive = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}