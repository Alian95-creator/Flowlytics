import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Bitcoin,
  Coins,
  Flame,
  Globe,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react";

const sections = [
  {
    title: "MARKETS",
    items: [
      { name: "Crypto", path: "/crypto", icon: Bitcoin },
      { name: "Commodities", path: "/commodity/xauusd", icon: Coins },
      { name: "Forex", path: "/forex", icon: Globe },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { name: "Market Trends", path: "/crypto?view=trends", icon: TrendingUp },
      { name: "Heatmap", path: "/forex?view=heatmap", icon: Flame },
      { name: "Volume", path: "/crypto?view=volume", icon: BarChart3 },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { name: "Users", path: "/users", icon: Users },
      { name: "Activity", path: "/activity", icon: Activity },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black border-r border-green-500/20 p-5 flex flex-col">

      {/* LOGO */}
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.png" className="w-6 h-6" />
        <h1 className="text-green-400 font-bold text-lg neon-green">
          Flowlytics
        </h1>
      </div>

      {/* MENU */}
      <div className="flex-1 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs text-gray-500 mb-2 tracking-wider">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                      ${
                        isActive
                          ? "bg-green-500/10 text-green-400 neon-green"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* WATCHLIST */}
      <div className="mt-6">
        <p className="text-xs text-gray-400 mb-2">WATCHLIST</p>

      <div className="space-y-1 text-sm">
        <p className="hover:text-green-400 cursor-pointer">BTC</p>
        <p className="hover:text-green-400 cursor-pointer">ETH</p>
        <p className="hover:text-green-400 cursor-pointer">XAU</p>
      </div>
    </div>

{/* MARKET STATUS */}
<div className="mt-6">
  <p className="text-xs text-gray-400 mb-2">MARKET STATUS</p>

  <div className="text-sm">
    <p>🟢 Crypto: Bullish</p>
    <p>🟡 Forex: Neutral</p>
    <p>🔴 Commodities: Bearish</p>
  </div>
</div>



      {/* FOOTER STATUS */}
      <div className="text-xs text-gray-500 mt-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Realtime Engine
        </div>
      </div>
    </div>
  );
}