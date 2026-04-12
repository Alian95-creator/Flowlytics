import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HERO */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-4xl md:text-6xl font-bold mb-4 neon-green">
          Flowlytics
        </h1>

        <p className="text-gray-400 max-w-xl mb-6">
          Real-time financial dashboard with AI insights, forex tracking,
          crypto analytics, and live user presence.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-xl bg-green-500 text-black font-bold hover-glow"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/pricing")}
            className="px-6 py-3 rounded-xl border border-gray-700 hover:bg-gray-900"
          >
            Pricing
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-600 text-sm pb-4">
        © 2026 Flowlytics — AI Trading Dashboard
      </div>
    </div>
  );
}