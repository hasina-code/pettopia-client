"use client";

import { HeartPulse, Bone, ShieldCheck, Footprints, Utensils, Zap } from "lucide-react";

export default function PetCareTips() {
  const tips = [
    { icon: <Utensils className="w-7 h-7 text-emerald-400" />, title: "Balanced Diet", desc: "Nutritious food for optimal health." },
    { icon: <Footprints className="w-7 h-7 text-sky-400" />, title: "Daily Exercise", desc: "Keep them active and happy." },
    { icon: <HeartPulse className="w-7 h-7 text-rose-400" />, title: "Regular Checkups", desc: "Annual vet visits are a must." },
    { icon: <ShieldCheck className="w-7 h-7 text-purple-400" />, title: "Vaccination", desc: "Stay safe from diseases." },
    { icon: <Zap className="w-7 h-7 text-amber-400" />, title: "Hygiene Care", desc: "Regular grooming is essential." },
    { icon: <Bone className="w-7 h-7 text-pink-400" />, title: "Safe Environment", desc: "Create a pet-proof home." }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black text-white mb-16 text-center tracking-tight">
          Essential <span className="text-pink-500">Pet Care</span> Tips
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 relative overflow-hidden transition-all hover:bg-slate-900/80 group ${
                i === 0 || i === 5 ? "lg:col-span-2" : "" 
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="mb-6 p-3 bg-slate-950 rounded-2xl w-fit border border-slate-800 shadow-inner">
                  {tip.icon}
                </div>
                <h4 className="font-black text-white text-lg mb-2">{tip.title}</h4>
                <p className="text-slate-400 text-sm max-w-sm">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}