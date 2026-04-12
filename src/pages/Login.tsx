import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [flip, setFlip] = useState(false);

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,170,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* CONTAINER */}
      <div className="relative w-[700px] h-[400px] flex items-center justify-center perspective">

        {/* LOGIN (LEFT) */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute left-0 w-[300px] h-[350px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center"
        >
          <h2 className="text-white text-lg mb-4">Login</h2>

          <button
            onClick={handleGoogle}
            className="w-full py-2 bg-green-500 text-black rounded-lg hover:scale-105 transition"
          >
            Google Login
          </button>
        </motion.div>

        {/* SIGN UP (RIGHT) */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute right-0 w-[300px] h-[350px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center"
        >
          <h2 className="text-white text-lg mb-4">Sign Up</h2>

          {/* 🔥 FLIP CARD */}
          <div
            className="w-full h-[200px] relative"
            onMouseEnter={() => setFlip(true)}
            onMouseLeave={() => setFlip(false)}
          >
            <motion.div
              animate={{ rotateY: flip ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full absolute"
              style={{ transformStyle: "preserve-3d" }}
            >

              {/* FRONT */}
              <div className="absolute w-full h-full backface-hidden flex items-center justify-center">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Create Account
                </button>
              </div>

              {/* BACK (FORM) */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col gap-2 justify-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
                <button className="bg-green-500 py-2 rounded text-black">
                  Register
                </button>
              </div>

            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* STYLE TAMBAHAN */}
      <style>
        {`
          .perspective {
            perspective: 1000px;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>

    </div>
  );
}