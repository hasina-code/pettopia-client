"use client";

import React from "react";
import Link from "next/link";
import { PawPrint, Mail, Phone, MapPin } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] border-t border-slate-900 text-slate-400 text-xs py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
     
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <PawPrint size={18} className="text-pink-500" />
            <span className="text-base font-black text-white tracking-tight">
              Pet<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Topia</span>
            </span>
          </Link>
          <p className="text-slate-500 leading-relaxed max-w-xs font-medium">
            A secure and transparent platform dedicated to connecting homeless, loving pets with compassionate forever families.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Contact Information</h4>
          <div className="space-y-2 text-slate-500 font-semibold">
            <a href="mailto:support@pettopia.com" className="flex items-center gap-2.5 hover:text-pink-400 transition-colors">
              <Mail size={13} className="text-slate-400" /> support@pettopia.com
            </a>
            <p className="flex items-center gap-2.5 cursor-default">
              <Phone size={13} className="text-slate-400" /> +880 17xx-xxxxxx
            </p>
            <p className="flex items-center gap-2.5 cursor-default">
              <MapPin size={13} className="text-slate-400" /> Sector 11, Uttara, Dhaka, Bangladesh
            </p>
          </div>
        </div>

        
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Social Links</h4>
          <p className="text-slate-500 font-medium max-w-xs">Follow our updates and pet adoption stories on social networks.</p>
          <div className="flex gap-3.5 pt-1">
            
            {/*  Facebook  */}
            <div className="w-8 h-8 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 cursor-default shadow-md">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </div>



            {/*  Twitter  */}

            <div className="w-8 h-8 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 cursor-default shadow-md">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
 

            {/* Instagram */}
            <div className="w-8 h-8 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 cursor-default shadow-md">
              <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>

            <div className="w-8 h-8 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 cursor-default shadow-md">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </div>
            
          </div>
        </div>

      </div>

  

  
      <div className="max-w-7xl mx-auto border-t border-slate-900/60 mt-10 pt-6 text-center text-slate-600 font-semibold text-[11px]">
        &copy; {new Date().getFullYear()} PetTopia Platform. All rights reserved.
      </div>
    </footer>
  );
}