import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const { dark, setDark } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900 border-b px-6 py-4 flex justify-between items-center transition">

      <h2 className="font-semibold dark:text-white">
        Dashboard
      </h2>

      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
      >
        {dark ? "Light ☀️" : "Dark 🌙"}
      </button>

    </div>
  );
}