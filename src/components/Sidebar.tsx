import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Flowlytics</h1>

      <nav className="space-y-4">
        <Link className="block hover:text-blue-400" to="/">
          Dashboard
        </Link>
        <Link className="block hover:text-blue-400" to="/users">
          Users
        </Link>
      </nav>
    </div>
  );
}