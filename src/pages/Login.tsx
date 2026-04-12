import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // 🔥 ambil full path + query
      const lastPath =
        localStorage.getItem("lastPath") || "/crypto";

      localStorage.removeItem("lastPath");

      navigate(lastPath); // ✅ React navigation
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      {/* GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 card-dark p-8 rounded-2xl w-[320px] space-y-4 animate-fadeIn"
      >
        <h1 className="text-xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-black rounded-lg font-bold"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}