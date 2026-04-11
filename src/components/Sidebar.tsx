import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Flowlytics</h1>

      <nav className="space-y-3">
        <Link
          to="/"
          className="block px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/users"
          className="block px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Users
        </Link>
      </nav>
    </div>
  );
}