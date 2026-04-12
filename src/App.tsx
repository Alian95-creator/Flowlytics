import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import Crypto from "./pages/Crypto";
import Commodity from "./pages/Commodity";
import Forex from "./pages/Forex";
import Users from "./pages/Users";
import Activity from "./pages/Activity";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";

export default function App() {
  const [open, setOpen] = useState(false);
  const touchStartX = useRef(0);
  const { user, loading } = useAuth();
  const location = useLocation();

  const publicRoutes = ["/", "/login", "/pricing"];
  const isPublic = publicRoutes.includes(location.pathname);

  // 🔥 SIMPAN FULL PATH + QUERY
  useEffect(() => {
    if (!user && !isPublic) {
      const fullPath =
        location.pathname + location.search;

      localStorage.setItem("lastPath", fullPath);
    }
  }, [location, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  // 🔐 BLOCK PRIVATE
  if (!user && !isPublic) {
    return <Login />;
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const deltaX =
      e.changedTouches[0].clientX - touchStartX.current;

    if (deltaX > 80) setOpen(true);
    if (deltaX < -80) setOpen(false);
  }

  // 🌐 PUBLIC PAGE
  if (isPublic) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  // 💻 DASHBOARD
  return (
    <div
      className="flex min-h-screen bg-gray-100 dark:bg-black transition"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hidden md:block">
        <Sidebar />
      </div>

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

        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}