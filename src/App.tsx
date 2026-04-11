import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

import Crypto from "./pages/Crypto";
import Commodity from "./pages/Commodity";
import Forex from "./pages/Forex";
import Users from "./pages/Users";
import Activity from "./pages/Activity";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black transition">

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* SIDEBAR MOBILE */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="w-64 h-full bg-black border-r border-gray-800 p-6 animate-slideIn">
            <Sidebar />
            <button
              onClick={() => setOpen(false)}
              className="mt-6 text-sm text-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        <Header onMenuClick={() => setOpen(true)} />

        <div className="p-4 md:p-6 flex-1 transition-all duration-300">
          <Routes>
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/commodity/:symbol" element={<Commodity />} />
            <Route path="/forex" element={<Forex />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activity" element={<Activity />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}