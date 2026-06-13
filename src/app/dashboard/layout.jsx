"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
 

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0b1329] text-white p-4 flex justify-between items-center">
        <span className="font-bold text-pink-400">MENU</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Wrapper */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-full md:w-72 bg-[#0b1329] text-white p-5`}
      >
        <h2 className="text-2xl font-bold mb-8 hidden md:block">MENU</h2>
        
        {/* Sidebar Component */}
        <Sidebar onClickLink={() => setIsOpen(false)} />
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-[#020817] min-h-[calc(100vh-60px)]">
        {children}
      </main>
    </div>
   
  );
}