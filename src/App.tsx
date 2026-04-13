import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import { supabase } from "./lib/supabase";

import Crypto from "./pages/Crypto";
import Commodity from "./pages/Commodity";
import Forex from "./pages/Forex";
import Users from "./pages/Users";
import Activity from "./pages/Activity";
import Login from "./pages/Login";

export default function App() {
  const [open, setOpen] = useState(false);
  const touchStartX = useRef(0);

  const { user, loading } = useAuth();

  // OAUTH HANDLER SAFE
  useEffect(() => {
    const hash = window.location.hash;
    const query = window.location.search;

    if (query.includes("code=") || hash.includes("access_token")) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          window.history.replaceState({}, "", "/crypto");
        }
      });
    }
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 80) setOpen(true);
    if (deltaX < -80) setOpen(false);
  }

  // 🔥 LOGIN GATE (IMPORTANT)
  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      Loading...
    </div>
  );
}

if (!user) {
  return <Login />;
}

  return (
    <div
      className="flex min-h-screen bg-black text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* SIDEBAR */}
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

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setOpen(true)} />

        <div className="p-4 flex-1 pb-20">
          <Routes>
            <Route path="/" element={<Navigate to="/crypto" />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/commodity" element={<Commodity />} />
            <Route path="/forex" element={<Forex />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activity" element={<Activity />} />
          </Routes>
        </div>

        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}