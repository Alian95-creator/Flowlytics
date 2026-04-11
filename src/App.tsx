import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Activity from "./pages/Activity";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useAuth } from "./hooks/useAuth";
import { useOnlineUsers } from "./hooks/useOnlineUsers";

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🚨 hook harus selalu dipanggil (tidak boleh conditional)
  useOnlineUsers(user, location.pathname);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!user) return <Login />;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}