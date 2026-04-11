import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const { dark, setDark } = useTheme();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition">

      {/* LEFT */}
      <h1 className="text-lg font-semibold dark:text-white">
        Dashboard
      </h1>

      {/* RIGHT */}
      <button
        onClick={() => setDark(!dark)}
        className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black hover:bg-gray-200 dark:hover:bg-white/5 transition"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

    </div>
  );
}