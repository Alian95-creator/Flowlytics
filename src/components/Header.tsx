import { useTheme } from "../hooks/useTheme";

export default function Header({ onMenuClick }: any) {
  const { dark, setDark } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* HAMBURGER (MOBILE ONLY) */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-white text-xl"
        >
          ☰
        </button>

        <h1 className="text-lg font-semibold dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black hover:bg-gray-200 dark:hover:bg-white/5 transition"
      >
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}