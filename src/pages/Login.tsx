import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function Login() {
  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* 🔥 GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,170,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 🔥 GLOW ORBS */}
      <div className="absolute w-96 h-96 bg-green-500/10 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-96 h-96 bg-blue-500/10 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse" />

      {/* 🔥 MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[360px] p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(0,255,170,0.08)]"
      >

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" className="w-10 h-10" />
        </div>

        {/* TITLE */}
        <h1 className="text-center text-white text-xl font-semibold">
          Flowlytics Terminal
        </h1>

        <p className="text-center text-gray-400 text-sm mb-6">
          Access Real-Time Market Intelligence
        </p>

        {/* 🔥 LOGIN BUTTON BINANCE STYLE */}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition relative overflow-hidden"
        >
          <span className="relative z-10">Sign in with Google</span>

          {/* shimmer */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition duration-700"></span>
        </button>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Secure login powered by Supabase
        </p>

      </motion.div>
    </div>
  );
}