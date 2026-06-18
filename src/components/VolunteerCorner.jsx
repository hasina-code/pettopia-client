"use client";

import React from 'react';
import { FaHandHoldingHeart, FaUsers, FaClock, FaArrowRight } from "react-icons/fa";

const VolunteerCorner = () => {
  const opportunities = [
    { title: "Pet Grooming", icon: FaHandHoldingHeart, desc: "Help our furry friends look their best." },
    { title: "Shelter Cleaning", icon: FaUsers, desc: "Keep our environment clean and safe." },
    { title: "Walking Buddies", icon: FaClock, desc: "Give our pets some exercise and love." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Volunteer <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Corner</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join our community of animal lovers and make a difference. Your time and kindness can change a pet's life forever.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {opportunities.map((opp, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-pink-500/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                <opp.icon size={30} />
              </div>
              <h3 className="text-xl font-bold mb-2">{opp.title}</h3>
              <p className="text-slate-400 text-sm mb-6">{opp.desc}</p>
              <button className="flex items-center gap-2 text-cyan-400 font-semibold hover:gap-3 transition-all">
                Learn More <FaArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ready to make an impact?</h2>
            <p className="text-slate-400">Fill out our volunteer form and we will get back to you soon.</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-500 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-900/20">
            Join as Volunteer
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCorner;