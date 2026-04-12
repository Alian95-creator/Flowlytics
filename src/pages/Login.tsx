import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function Login() {
  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* 🔥 BACKGROUND GRADIENT ANIMATION */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-green-500/10 via-black to-blue-500/10 blur-3xl"></div>

      {/* 🔥 FLOATING LIGHT */}
      <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl top-10 left-10 animate-bounce"></div>
      <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl bottom-10 right-10 animate-bounce delay-1000"></div>

      {/* 🔥 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 w-80 text-center shadow-xl"
      >

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" className="w-10 h-10" />
        </div>

        <h1 className="text-white text-xl font-bold mb-2">
          Welcome to Flowlytics
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Real-time Market Intelligence
        </p>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-green-500 text-black font-semibold hover:scale-105 transition"
        >
          Continue with Google
        </button>

      </motion.div>
    </div>
  );
}