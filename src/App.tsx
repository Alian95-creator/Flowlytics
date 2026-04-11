import { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import { Routes, Route } from "react-router-dom";

import Crypto from "./pages/Crypto";
import Commodity from "./pages/Commodity";
import Forex from "./pages/Forex";
import Users from "./pages/Users";
import Activity from "./pages/Activity";

export default function App() {
  const [open, setOpen] = useState(false);
  const touchStartX = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 80) {
      setOpen(true); // swipe right → open
    }

    if (deltaX < -80) {
      setOpen(false); // swipe left → close
    }
  }

  return (
    <div
      className="flex min-h-screen bg-gray-100 dark:bg-black transition"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="w-64 h-full bg-black border-r border-gray-800 p-6 animate-slideIn">
            <Sidebar />
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        <Header onMenuClick={() => setOpen(true)} />

        <div className="p-4 md:p-6 flex-1 pb-20">
          <Routes>
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/commodity/:symbol" element={<Commodity />} />
            <Route path="/forex" element={<Forex />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activity" element={<Activity />} />
          </Routes>
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden">
          <BottomNav />
        </div>

      </div>
    </div>
  );
}