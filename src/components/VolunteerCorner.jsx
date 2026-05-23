"use client";

import { Heart, Star, Users } from "lucide-react";

export default function VolunteerCorner() {
  return (
    <section className="py-24 bg-slate-950 text-white">
       
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center"> <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-pink-500 text-sm font-bold tracking-wide mb-5">
             Success Stories
          </span>
       </div>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
           
     
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-900 to-pink-950 p-10 rounded-[3rem] border border-slate-800 flex flex-col justify-end">
            <h2 className="text-5xl font-black mb-6 leading-tight">
              Lend a Hand, <br />
              <span className="text-pink-500">Change a Life.</span>
            </h2>
            <p className="text-slate-400 max-w-md text-lg">
              Our volunteers are the backbone of PetTopia. Whether you have an hour or a whole weekend, there is a place for you.
            </p>
          </div>

       
          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 flex flex-col justify-between hover:bg-slate-800 transition-colors">
            <Heart className="text-pink-500" size={32} />
            <p className="font-bold text-xl">Love Animals?</p>
          </div>

        
          <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 flex flex-col justify-between hover:bg-slate-800 transition-colors">
            <Users className="text-cyan-500" size={32} />
            <p className="font-bold text-xl">Join Community</p>
          </div>

       
          <div className="md:col-span-3 bg-pink-500 p-8 rounded-[2rem] flex flex-row items-center justify-between hover:bg-pink-600 transition-all cursor-pointer group">
            <div>
              <h3 className="text-3xl font-black text-slate-900">Ready to start volunteering?</h3>
              <p className="text-slate-900 font-bold mt-1">Get registered today and join our elite team of pet rescuers.</p>
            </div>
            <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="text-white" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}