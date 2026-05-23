"use client";

import { Heart, ShieldCheck, Smile } from "lucide-react";

export default function WhyAdopt() {
  const reasons = [
    {
      title: "Save a Life",
      desc: "Millions of pets are waiting for a home. By adopting, you are giving a second chance and directly saving a precious life from shelters.",
      icon: <Heart className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Unconditional Love",
      desc: "Adopted pets are often incredibly grateful. They bring joy, companionship, and reduce stress, making your home a much happier place.",
      icon: <Smile className="w-8 h-8 text-amber-400" />,
    },
    {
      title: "Fight Cruelty",
      desc: "Adoption discourages unethical breeding practices like puppy mills. You are taking a stand for animal welfare and kindness.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Why Adopt Pets?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Adopting isn't just about getting a pet; it's about changing a life 
            and gaining a loyal friend for years to come.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <div 
              key={i} 
              className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:bg-slate-700 transition-colors">
                {r.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{r.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}