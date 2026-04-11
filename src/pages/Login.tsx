import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email) return alert("Enter your email bro");

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5173",
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Magic link sent! Check your email 🚀");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-sm">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Flowlytics
        </h1>

        <p className="text-gray-400 text-sm text-center mb-6">
          Welcome back — sign in to continue
        </p>

        {/* INPUT */}
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full mt-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-4">
          No password needed. Secure login via email.
        </p>
      </div>
    </div>
  );
}