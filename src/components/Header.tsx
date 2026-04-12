type Props = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: Props) {
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

        {/* DARK MODE BUTTON (kalau ada logic lama, tetap aman) */}
        <button className="px-3 py-1 rounded-lg bg-gray-800 text-white">
          🌙
        </button>

      </div>
    </div>
  );
}