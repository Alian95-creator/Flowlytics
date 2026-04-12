import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-black text-white border-r border-gray-800 p-6">

      {/* LOGO */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/logo.png" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-green-400">
          Flowlytics
        </h1>
      </div>

      {/* MENU */}
      <div className="space-y-6">

        <div>
          <p className="text-gray-500 text-xs mb-2">MARKET</p>
          <div className="space-y-2">
            <Link to="/crypto" className="block hover:text-green-400">
              Crypto
            </Link>
            <Link to="/commodity/xauusd" className="block hover:text-green-400">
              Gold
            </Link>
            <Link to="/commodity/oilusd" className="block hover:text-green-400">
              Oil
            </Link>
            <Link to="/commodity/copperusd" className="block hover:text-green-400">
              Copper
            </Link>
            <Link to="/forex" className="block hover:text-green-400">
              Forex
            </Link>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-xs mb-2">SYSTEM</p>
          <div className="space-y-2">
            <Link to="/users" className="block hover:text-green-400">
              Users
            </Link>
            <Link to="/activity" className="block hover:text-green-400">
              Activity
            </Link>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 left-6 text-xs text-gray-500">
        Realtime Engine ⚡
      </div>

    </div>
  );
}