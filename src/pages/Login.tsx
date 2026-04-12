import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function Login() {
  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">

      {/* 🌌 NEON BACKGROUND */}
      <div className="absolute inset-0">

        {/* glow kiri */}
        <div className="absolute w-[400px] h-[400px] bg-green-400/10 blur-3xl rounded-full top-[-100px] left-[-100px] animate-[pulse_6s_ease-in-out_infinite]" />

        {/* glow kanan */}
        <div className="absolute w-[400px] h-[400px] bg-green-400/10 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-[pulse_8s_ease-in-out_infinite]" />

      </div>

      {/* 💎 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm bg-black/60 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(34,197,94,0.08)]"
      >

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" className="w-10 h-10" />
        </div>

        {/* TITLE */}
        <h1 className="text-green-400 text-xl font-semibold text-center neon-green">
          Flowlytics
        </h1>

        <p className="text-gray-400 text-sm text-center mb-6">
          Real-time market intelligence
        </p>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-green-500 text-black font-semibold transition-all
          hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:scale-[1.02]"
        >
          Continue with Google
        </button>

      </motion.div>
    </div>
  );
}