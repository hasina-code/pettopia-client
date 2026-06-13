"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const isValidPassword =
    form.password.length >= 6 &&
    /[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return toast.error("All fields are required!");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (!isValidPassword) {
      return toast.error("Weak password!");
    }

    try {
      setLoading(true);

      const res = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image || "",
      });

      if (res?.error) {
        toast.error(res.error.message || "Registration failed");
        return;
      }

      toast.success("Account created!");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Create Account
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
        />

        <input
          name="image"
          placeholder="Photo URL (optional)"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-xl bg-slate-950 text-white border border-slate-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl text-white font-bold"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center mt-4 text-slate-400 text-sm">
          Already have account?{" "}
          <Link href="/login" className="text-pink-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}