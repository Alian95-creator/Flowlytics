import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: Props) {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  // 🔥 DARK MODE TOGGLE
  function toggleDark() {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setDark(!dark);
  }

  // 🔥 LOGOUT
  async function handleLogout() {
    await supabase.auth.signOut();

    navigate("/login", { replace: true });
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-white dark:bg-black transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-white text-xl"
        >
          ☰
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-6 h-6" />
          <span className="font-bold text-white hidden sm:block">
            Flowlytics
          </span>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* DARK MODE */}
        <button
          onClick={toggleDark}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded-lg bg-red-500 text-white hover:opacity-80 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}