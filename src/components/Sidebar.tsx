import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-6 flex flex-col justify-between">
      
      {/* TOP */}
      <div>
        <h1 className="text-2xl font-bold mb-8">Flowlytics</h1>

        <nav className="space-y-2 text-sm">

          <p className="text-gray-400 text-xs mt-4 mb-2">CRYPTO</p>
          <Link to="/crypto" className="block hover:bg-white/10 px-3 py-2 rounded">
            Crypto Prices
          </Link>

          <p className="text-gray-400 text-xs mt-4 mb-2">COMMODITIES</p>
          <Link to="/commodity/xauusd" className="block hover:bg-white/10 px-3 py-2 rounded">Gold (XAU/USD)</Link>
          <Link to="/commodity/oilusd" className="block hover:bg-white/10 px-3 py-2 rounded">Oil</Link>
          <Link to="/commodity/copperusd" className="block hover:bg-white/10 px-3 py-2 rounded">Copper</Link>

          <p className="text-gray-400 text-xs mt-4 mb-2">FOREX</p>
          <Link to="/forex" className="block hover:bg-white/10 px-3 py-2 rounded">
            IDR Comparison
          </Link>

          <p className="text-gray-400 text-xs mt-4 mb-2">SYSTEM</p>
          <Link to="/users" className="block hover:bg-white/10 px-3 py-2 rounded">
            Active Users
          </Link>
          <Link to="/activity" className="block hover:bg-white/10 px-3 py-2 rounded">
            Activity Feed
          </Link>

        </nav>
      </div>

      {/* BOTTOM */}
      <div className="text-xs text-gray-400">
        Realtime System ⚡
      </div>

    </div>
  );
}