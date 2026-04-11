import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-full md:w-64 bg-black text-white border-r border-gray-800 p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold mb-8 neon-green">
          Flowlytics
        </h1>

        <nav className="space-y-2 text-sm">

          <p className="text-gray-500 text-xs">MARKET</p>

          <Link to="/crypto" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Crypto
          </Link>

          <Link to="/commodity/xauusd" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Gold
          </Link>

          <Link to="/commodity/oilusd" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Oil
          </Link>

          <Link to="/commodity/copperusd" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Copper
          </Link>

          <Link to="/forex" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Forex
          </Link>

          <p className="text-gray-500 text-xs mt-4">SYSTEM</p>

          <Link to="/users" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Users
          </Link>

          <Link to="/activity" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Activity
          </Link>

        </nav>
      </div>

      <div className="text-xs text-gray-500">
        Realtime Engine ⚡
      </div>
    </div>
  );
}