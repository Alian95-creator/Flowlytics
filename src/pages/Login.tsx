import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const lastPath =
        localStorage.getItem("lastPath") || "/crypto";

      localStorage.removeItem("lastPath");

      navigate(lastPath);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 card-dark p-8 rounded-2xl w-[320px] space-y-4 animate-fadeIn"
      >
        <h1 className="text-xl font-bold text-center text-white">
          {mode === "login" ? "Login" : "Create Account"}
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        />

        {/* CONFIRM PASSWORD (SIGNUP ONLY) */}
        {mode === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          />
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-black rounded-lg font-bold"
        >
          {loading
            ? "Processing..."
            : mode === "login"
            ? "Login"
            : "Sign Up"}
        </button>

        {/* SWITCH MODE */}
        <p className="text-sm text-center text-gray-400">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="ml-1 text-green-400 cursor-pointer hover:underline"
          >
            {mode === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}