"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, RefreshCw, ArrowUpDown } from "lucide-react";
import PetCard from "@/components/PetCard";



const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  

  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [sortOrder, setSortOrder] = useState("low-to-high");

  
  const speciesOptions = [
    { label: "All Pets ", value: "" },
    { label: "Dogs", value: "Dog" },
    { label: "Cats", value: "Cat" },
    { label: "Birds", value: "Bird" },
    { label: "Rabbits", value: "Rabbit" },
  ];

 const fetchPets = async () => {
    setLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      
      let url = `${serverUrl}/pets?`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      if (selectedSpecies) url += `species=${encodeURIComponent(selectedSpecies)}&`;
      if (sortOrder) url += `sort=${sortOrder}&`;

      console.log("Requesting URL:", url); 
      const res = await axios.get(url);
      setPets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [selectedSpecies, sortOrder]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPets();
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedSpecies("");
    setSortOrder("low-to-high");
    
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    setLoading(true);
    axios.get(`${serverUrl}/pets?sort=low-to-high`).then((res) => {
      if (Array.isArray(res.data)) setPets(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/*  Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-cyan-500/20 inline-block mb-4">
            Find Your Future Best Friend
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Browse All Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Pets</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Explore our comprehensive list of animals waiting for adoption. Find your perfect match today!
          </p>
        </div>

        
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          
   
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <form 
              onSubmit={handleSearchSubmit} 
              className="flex-1 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-2 pl-5 border border-slate-800 rounded-2xl shadow-2xl focus-within:border-pink-500/50 transition-all duration-300"
            >
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-sm"
              />
              
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-black rounded-xl text-xs md:text-sm transition-all shadow-md active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>

          
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-2 border border-slate-800 rounded-2xl shrink-0">
              <ArrowUpDown className="h-4 w-4 text-slate-400 ml-2" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent text-slate-300 text-xs md:text-sm font-bold focus:outline-none pr-4 cursor-pointer"
              >
                <option value="low-to-high" className="bg-slate-900 text-slate-300">Price: Low to High</option>
                <option value="high-to-low" className="bg-slate-900 text-slate-300">Price: High to Low</option>
              </select>

             
              <button
                type="button"
                onClick={handleReset}
                title="Reset Filters"
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700/60 flex items-center justify-center active:scale-95"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {speciesOptions.map((option) => {
              const isActive = selectedSpecies === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setSelectedSpecies(option.value)}
                  className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold tracking-wide border transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white border-transparent shadow-lg shadow-pink-500/10 scale-105"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          
        </div>



        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner loading-lg text-pink-500"></span>
          </div>
        ) : pets.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-slate-900 max-w-xl mx-auto">
            <p className="text-xl font-black text-slate-400 mb-2">No companions found 🐾</p>
            <p className="text-sm text-slate-500">Try checking another category or clearing your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllPetsPage;