import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // ⛔ biar gak reload page

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for login link 🚀");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">

      <form
        onSubmit={handleLogin}
        className="bg-black border border-gray-800 p-8 rounded-2xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Flowlytics
        </h1>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded bg-black border border-gray-700 text-white outline-none focus:border-white transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded bg-white text-black font-semibold hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Press Enter to login ⚡
        </p>
      </form>

    </div>
  );
}