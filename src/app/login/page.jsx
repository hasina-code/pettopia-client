"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password required!");
    }

    try {
      setLoading(true);

      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || "Login failed");
        return;
      }

      toast.success("Login successful!");
      router.push(callbackUrl);
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err) {
      toast.error("Google login failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        {/* Google */}
<button
  type="button"
  onClick={handleGoogleLogin}
  disabled={loading}
  className="w-full flex items-center justify-center gap-3 py-3 bg-white text-black hover:bg-slate-100 transition-colors duration-200 rounded-xl mb-4 font-bold disabled:opacity-70 disabled:cursor-not-allowed"
>
      <FcGoogle size={20} />
      <span>Continue with Google</span>
</button>

        <div className="text-center text-slate-500 mb-4">
          or login with email
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-slate-950 text-white border border-slate-700"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl text-white font-bold"
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>

        {/* Register */}
        <p className="text-center mt-4 text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-pink-500">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}