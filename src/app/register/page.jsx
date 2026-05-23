"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, password, confirmPassword, photoURL } = Object.fromEntries(formData);

    if (password !== confirmPassword) return toast.error("Passwords do not match!");
    
    const { error } = await authClient.signUp.email({ email, password, name, image: photoURL });
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created successfully!");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <form onSubmit={handleRegister} className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-black text-white mb-6">Create your account</h2>
        
        <input name="name" placeholder="Full Name" className="w-full p-3 mb-4 rounded-xl bg-slate-950 border border-slate-800 text-white" required />
        <input name="email" type="email" placeholder="Email address" className="w-full p-3 mb-4 rounded-xl bg-slate-950 border border-slate-800 text-white" required />
        <input name="photoURL" placeholder="Photo URL (optional)" className="w-full p-3 mb-4 rounded-xl bg-slate-950 border border-slate-800 text-white" />
        
        <input 
          name="password" type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white" required 
        />
        
        {/* Validation UI */}
        <div className="text-xs text-slate-400 mb-4 space-y-1">
          <p className={password.length >= 6 ? "text-green-500" : ""}>✓ At least 6 characters</p>
          <p className={/[A-Z]/.test(password) ? "text-green-500" : ""}>✓ One uppercase letter</p>
          <p className={/[a-z]/.test(password) ? "text-green-500" : ""}>✓ One lowercase letter</p>
        </div>

        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full p-3 mb-6 rounded-xl bg-slate-950 border border-slate-800 text-white" required />
        
        <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl font-bold text-white">Create Account</button>
        <p className="text-center text-slate-400 mt-4 text-sm">Already have an account? <Link href="/login" className="text-pink-500">Sign in</Link></p>
      </form>
    </div>
  );
}