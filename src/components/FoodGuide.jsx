"use client";

import { CheckCircle2 } from "lucide-react";

export default function FoodGuide() {
  const steps = [
    { title: "Proteins", desc: "Lean meats like chicken and fish for muscle health." },
    { title: "Healthy Fats", desc: "Natural oils to keep their coat shiny and soft." },
    { title: "Vitamins", desc: "Essential minerals for strong bones and immunity." },
    { title: "Strictly Avoid", desc: "Never feed them chocolate, onion, or grapes." }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
          Pet Nutrition Timeline
        </h2>

        <div className="relative border-l-2 border-slate-800 ml-3 space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-8">
              {/* Dot Indicator */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-950 border-2 border-pink-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              </div>
              
              {/* Content */}
              <div className="group cursor-pointer">
                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}