"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // login redirect (important for Adopt Now redirect)
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login Successful!");

      router.push(callbackUrl);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome back!
        </h2>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full py-3 bg-white text-slate-900 rounded-xl mb-4 font-bold"
        >
          Continue with Google
        </button>

        <div className="text-center text-slate-500 mb-4">
          or sign in with email
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-6 rounded-xl bg-slate-950 text-white border border-slate-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl text-white font-bold"
        >
          Sign In
        </button>

        {/* Links */}
        <p className="text-center mt-4 text-slate-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-pink-500">
            Create one free
          </Link>
        </p>
      </form>
    </div>
  );
}