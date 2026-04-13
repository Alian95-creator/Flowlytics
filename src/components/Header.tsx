import { supabase } from "../lib/supabase";
import useTheme from "../hooks/useTheme";

type Props = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: Props) {
  const { dark, setDark } = useTheme();

  async function handleLogout() {
  try {
    // 1. sign out dari Supabase
    await supabase.auth.signOut();

    // 2. 🔥 HAPUS SEMUA SESSION LOCAL (INI KUNCI)
    localStorage.clear();
    sessionStorage.clear();

    // 3. 🔥 FORCE HARD RESET APP
    window.location.href = "/";
  } catch (err) {
    console.error("Logout error:", err);
  }
}

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black text-white">

      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden">
          ☰
        </button>

        <img src="/logo.png" className="w-6 h-6" />
        <span className="font-bold">Flowlytics</span>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 bg-gray-800 rounded"
        >
          {dark ? "Light" : "Dark"}
        </button>

        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}