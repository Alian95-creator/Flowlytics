import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { supabase } from "./lib/supabase";
import { Navigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // 🔥 HANDLE OAUTH CALLBACK (INI KUNCI)
  useEffect(() => {
    const hash = window.location.hash;
    const query = window.location.search;

    if (query.includes("code=") || hash.includes("access_token")) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          navigate("/crypto", { replace: true });
        }
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 80) setOpen(true);
    if (deltaX < -80) setOpen(false);
  }

  return (
    <div
      className="flex min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 dark:bg-black/80 md:hidden"
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

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setOpen(true)} />

        <div className="p-4 flex-1 pb-20 bg-white dark:bg-black transition">
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