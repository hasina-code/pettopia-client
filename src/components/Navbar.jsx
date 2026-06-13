"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Home,
  Search,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  UserPlus,
  LogIn,
  PawPrint,
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      toast.success("Logged out successfully");
      setDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navLink = (href) =>
    pathname === href
      ? "flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1b4b] text-pink-400 border border-pink-500/20 text-sm font-semibold"
      : "flex items-center gap-2 px-4 py-2 rounded-full text-slate-300 hover:text-white transition text-sm font-semibold";

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1329] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
            <PawPrint size={20} className="text-pink-500" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            PetTopia
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className={navLink("/")}>
            <Home size={16} /> Home
          </Link>
          <Link href="/all-pets" className={navLink("/all-pets")}>
            <Search size={16} /> All Pets
          </Link>
        </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-20 h-8 bg-slate-700 rounded-full animate-pulse" />
            ) : !session ? (
              <div className="flex items-center gap-2">
                <Link href="/login" className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold">
                  <LogIn size={16} /> Login
                </Link>
                <Link href="/register" className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 rounded-full text-white text-sm font-semibold">
                  <UserPlus size={16} /> Register
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full p-1 pr-3">
                  <img src={session.user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="user" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-white text-sm font-medium max-w-[80px] truncate">{session.user?.name || "User"}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800">
                      <h4 className="text-white font-semibold truncate">{session.user?.name}</h4>
                      <p className="text-slate-400 text-sm truncate">{session.user?.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-300">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
     

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b1329] border-t border-slate-800 p-6 flex flex-col gap-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 font-semibold">Home</Link>
          <Link href="/all-pets" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 font-semibold">All Pets</Link>
          {!session ? (
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-white">Login</Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-pink-400">Register</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-white">Dashboard</Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-red-400 text-left">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}