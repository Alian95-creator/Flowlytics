import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setLoading(true);

    setTimeout(async () => {
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    }, 1200); // 🔥 kasih delay biar animasi jalan dulu
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* BACKGROUND */}
      <div className="absolute w-72 h-72 bg-green-500/10 blur-3xl rounded-full top-0 left-0" />
      <div className="absolute w-72 h-72 bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0" />

      {/* MAIN PANEL */}
      <div className="relative w-full max-w-md h-[480px] rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-xl">

        {/* SLIDER */}
        <motion.div
          animate={{ x: mode === "login" ? "0%" : "-100%" }}
          transition={{ duration: 0.5 }}
          className="flex w-[200%] h-full"
        >

          {/* LOGIN */}
          <div className="w-full flex flex-col justify-center p-6">

            <h2 className="text-white text-xl font-semibold text-center">
              Welcome Back
            </h2>

            <p className="text-gray-400 text-sm text-center mb-6">
              Login to your account
            </p>

            <button
              onClick={handleGoogle}
              className="w-full py-2 bg-green-500 text-black rounded-lg font-semibold hover:scale-105 transition"
            >
              Continue with Google
            </button>

            <p className="text-gray-400 text-sm mt-6 text-center">
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-green-400 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>

          {/* SIGNUP */}
          <div className="w-full flex flex-col justify-center p-6">

            <h2 className="text-white text-xl font-semibold text-center">
              Create Account
            </h2>

            <p className="text-gray-400 text-sm text-center mb-6">
              Join Flowlytics today
            </p>

            <input
              type="email"
              placeholder="Email"
              className="mb-3 p-2 rounded bg-black border border-gray-700 text-white"
            />

            <input
              type="password"
              placeholder="Password"
              className="mb-4 p-2 rounded bg-black border border-gray-700 text-white"
            />

            <button className="w-full py-2 bg-green-500 text-black rounded-lg font-semibold hover:scale-105 transition">
              Register
            </button>

            <p className="text-gray-400 text-sm mt-6 text-center">
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-green-400 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>

        </motion.div>

        {/* INDICATOR */}
        <motion.div
          animate={{ left: mode === "login" ? "0%" : "50%" }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 w-1/2 h-[3px] bg-green-400"
        />

      </div>

      {/* 🔥 LOADING OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          >
            {/* SPINNER */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full mb-6"
            />

            {/* TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-sm"
            >
              Connecting to market...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}