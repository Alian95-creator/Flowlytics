import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/crypto",
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-sm border border-gray-800 space-y-4">

        <h1 className="text-2xl font-bold text-white text-center">
          Flowlytics Login
        </h1>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full p-3 rounded-lg bg-white text-black font-bold hover:opacity-80 transition"
        >
          {loading ? "Connecting..." : "Continue with Google"}
        </button>

      </div>
    </div>
  );
}