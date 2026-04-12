import { useEffect, useState } from "react";

type Props = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: Props) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggleDark() {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-white dark:bg-black transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <button
          onClick={onMenuClick}
          className="md:hidden text-black dark:text-white text-xl"
        >
          ☰
        </button>

        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-6 h-6" />
          <span className="font-bold text-black dark:text-white hidden sm:block">
            Flowlytics
          </span>
        </div>

      </div>

      {/* RIGHT */}
      <button
        onClick={toggleDark}
        className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition hover:shadow-[0_0_10px_rgba(0,255,159,0.5)]"
      >
        {dark ? "☀️" : "🌙"}
      </button>

    </div>
  );
}