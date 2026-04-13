import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import { Routes, Route, Navigate } from "react-router-dom";

import Crypto from "./pages/Crypto";
import Commodity from "./pages/Commodity";
import Forex from "./pages/Forex";
import Users from "./pages/Users";
import Activity from "./pages/Activity";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-64 h-full bg-black p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <Header onMenuClick={() => setOpen(true)} />

        {/* CONTENT */}
        <div className="p-4 flex-1 pb-20">

          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/commodity" element={<Commodity />} />
            <Route path="/forex" element={<Forex />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activity" element={<Activity />} />
          </Routes>

        </div>

        {/* BOTTOM NAV */}
        <div className="md:hidden">
          <BottomNav />
        </div>

      </div>
    </div>
  );
}