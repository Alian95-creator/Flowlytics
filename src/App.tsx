import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user } = useAuth();

  if (!user) return <Login />;

  return (
    <BrowserRouter>
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}