import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as any)?.from || "/crypto";

  // 🔥 LOGIN EMAIL
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Login berhasil 🚀");

    setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 800);
  }

  // 🔥 SIGNUP + AUTO LOGIN
  async function handleSignup() {
    if (!email || !password) {
      toast.error("Isi email & password dulu");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // auto login setelah signup
    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      toast.error("Signup berhasil, tapi login gagal");
      setLoading(false);
      return;
    }

    toast.success("Akun dibuat & langsung login 🔥");

    setTimeout(() => {
      navigate("/crypto");
    }, 800);
  }

  // 🔥 GOOGLE LOGIN (FIX FINAL)
  async function handleGoogleLogin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // 🔥 PENTING (BUKAN /crypto)
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-sm border border-gray-800 space-y-4"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Flowlytics Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-green-400 transition"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-green-400 transition"
          required
        />

        {/* LOGIN */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-green-500 text-black font-bold hover:opacity-80 transition"
        >
          {loading ? "Processing..." : "Login"}
        </button>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full p-3 rounded-lg bg-white text-black font-bold hover:opacity-80 transition"
        >
          Continue with Google
        </button>

        {/* SIGNUP */}
        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className="w-full p-3 rounded-lg border border-gray-700 text-white hover:bg-white/10 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}