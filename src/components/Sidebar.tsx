import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white h-full flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold p-6 neon-green">
          Flowlytics
        </h1>

        <nav className="space-y-1 px-4 text-sm">

          <p className="text-gray-500 text-xs mt-4">MARKET</p>

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

          <p className="text-gray-500 text-xs mt-6">SYSTEM</p>

          <Link to="/users" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Users
          </Link>

          <Link to="/activity" className="block px-3 py-2 rounded hover:bg-white/5 transition">
            Activity
          </Link>
        </nav>
      </div>

      <div className="text-xs text-gray-500 p-4">
        Realtime Engine ⚡
      </div>
    </div>
  );
}