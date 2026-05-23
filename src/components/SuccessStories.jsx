"use client";

import { Star } from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      name: "Sarah & Max",
      pet: "Labrador Mix",
      story: "Max was a shy rescue dog who'd been passed over dozens of times. Now he greets me at the door every day.",
      borderColor: "border-orange-500",
      glow: "shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]"
    },
    {
      name: "John & Whiskers",
      pet: "Tabby Cat",
      story: "Whiskers came as a stray kitten. Now she sleeps on my pillow and purrs me to sleep. I can't imagine life without her.",
      borderColor: "border-cyan-500",
      glow: "shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
    },
    {
      name: "Emma & Tweety",
      pet: "Budgerigar",
      story: "Our budgie Tweety learned to say 'I love you' within a week. He sings every morning and brightens our household!",
      borderColor: "border-pink-500",
      glow: "shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]"
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-pink-500 text-sm font-bold tracking-wide mb-5">
            🥩 Success Stories
          </span>
        
          <h2 className="text-4xl md:text-5xl font-black mb-4">Happy Tails & Happy Homes</h2>
          <p className="text-slate-400">Real stories from real families who found their perfect match.</p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <div 
              key={i} 
              className={`p-6 bg-slate-900 rounded-3xl border-2 ${s.borderColor} ${s.glow} transition-all hover:scale-105`}
            >
              {/* Rating */}
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              
              {/* Story */}
              <p className="text-slate-300 text-sm italic mb-6 leading-relaxed">
                {s.story}
              </p>

              {/* Author */}
              <div className="border-t border-slate-800 pt-4 mt-auto">
                <h4 className="font-bold text-lg">{s.name}</h4>
                <p className="text-xs text-slate-500 font-semibold">{s.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}