"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Home, Search, LayoutDashboard, LogOut, Sun, ChevronDown, UserPlus, LogIn, PlusCircle, GitPullRequest, PawPrint } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  
  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setDropdownOpen(false);
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <nav className="bg-[#0b1329] border-b border-slate-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        
<Link href="/" className="flex items-center gap-3 group focus:outline-none">
 
  <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center shadow-lg shadow-pink-500/5 group-hover:border-pink-500/40 group-hover:bg-slate-800/50 transition-all duration-300">
    <PawPrint 
      className="text-pink-500 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" 
      size={20} 
    />
  </div>
  
  {/* টেক্সট */}
  <span className="text-xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
    PetTopia
  </span>
</Link>

      
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
              pathname === "/"
                ? "bg-[#1e1b4b] text-pink-400 border border-pink-500/20 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Home size={14} /> Home
          </Link>
          
          <Link
            href="/all-pets"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
              pathname === "/all-pets"
                ? "bg-[#1e1b4b] text-pink-400 border border-pink-500/20 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Search size={14} /> All Pets
          </Link>

          {session && (
            <>
              <Link
                href="/dashboard/my-requests"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                  pathname === "/dashboard/my-requests"
                    ? "bg-[#1e1b4b] text-pink-400 border border-pink-500/20 shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <GitPullRequest size={14} /> My Requests
              </Link>
              <Link
                href="/dashboard/add-pet"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                  pathname === "/dashboard/add-pet"
                    ? "bg-[#1e1b4b] text-pink-400 border border-pink-500/20 shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <PlusCircle size={14} /> Add Pet
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-amber-400 hover:text-amber-300 p-1.5 rounded-xl bg-slate-900/50 border border-slate-800/80 transition-all">
            <Sun size={16} />
          </button>

          {isPending ? (
            <div className="h-8 w-20 bg-slate-900/80 rounded-full animate-pulse border border-slate-800"></div>
          ) : !session ? (
            
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1 text-slate-300 hover:text-white font-bold text-xs px-3 py-2 transition-colors"
              >
                <LogIn size={14} /> Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-black text-xs px-4 py-2 rounded-full shadow-lg transition-all active:scale-95"
              >
                <UserPlus size={13} /> Get Started
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 pr-2.5 bg-[#0f172a]/80 hover:bg-[#1e293b] border border-slate-800 rounded-full text-slate-200 font-bold text-xs transition-all shadow-md focus:outline-none"
              >
                <img
                  src={session.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                  alt={session.user.name}
                  className="w-6 h-6 rounded-full object-cover border border-pink-500/30"
                />
                <span className="max-w-[70px] truncate text-slate-300">
                  {session.user.name?.split(" ")[0] || "User"}
                </span>
                <ChevronDown size={12} className={`text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-md">
                  
                  <div className="p-4 bg-slate-950/40 border-b border-slate-800/50">
                    <p className="text-xs font-black text-slate-200 truncate">{session.user.name}</p>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{session.user.email}</p>
                  </div>

                  <div className="p-2 space-y-1">
                    <Link
                      href="/dashboard/my-requests"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-2.5 bg-[#fbc02d] hover:bg-[#f9a825] text-slate-950 font-black rounded-xl text-xs transition-all shadow-md"
                    >
                      <LayoutDashboard size={14} className="stroke-[2.5]" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-rose-500/90 hover:text-rose-400 hover:bg-rose-500/5 font-bold rounded-xl text-xs text-left transition-all"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}