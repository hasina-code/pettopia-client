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
  const [isMounted, setIsMounted] = useState(false);

  const speciesOptions = [
    { label: "All Pets", value: "" },
    { label: "Dogs", value: "Dog" },
    { label: "Cats", value: "Cat" },
    { label: "Birds", value: "Bird" },
    { label: "Rabbits", value: "Rabbit" },
  ];

  const fetchPets = async (search = searchQuery, species = selectedSpecies, sort = sortOrder) => {
    setLoading(true);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search);
      if (species) params.append("species", species);
      params.append("sort", sort);

      const url = `${serverUrl}/pets?${params.toString()}`;
      const res = await axios.get(url);
      setPets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchPets();
  }, []); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPets();
  };

  const handleSpeciesChange = (value) => {
    setSelectedSpecies(value);
    fetchPets(searchQuery, value, sortOrder);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    fetchPets(searchQuery, selectedSpecies, value);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedSpecies("");
    setSortOrder("low-to-high");
    fetchPets("", "", "low-to-high");
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-14">
  <h1 className="text-5xl md:text-5xl font-black text-white mb-4">
    Browse All <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Available Pets</span>
  </h1>
  
  <p className="text-slate-400 text-lg">
    Every pet has a story waiting to be told. Discover your perfect companion today and give them the life they deserve.
  </p>
</div>

        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search and Sort Row */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3 bg-slate-900/80 p-2 pl-5 border border-slate-800 rounded-2xl">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 bg-transparent text-slate-200 outline-none text-sm"
              />
              <button type="submit" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl text-sm font-black">Search</button>
            </form>

            <div className="flex items-center gap-2 bg-slate-900/80 p-2 border border-slate-800 rounded-2xl">
              <ArrowUpDown className="h-4 w-4 text-slate-400 ml-2" />
              <select value={sortOrder} onChange={handleSortChange} className="bg-transparent text-sm font-bold outline-none cursor-pointer">
                <option value="low-to-high" className="bg-slate-900">Price: Low to High</option>
                <option value="high-to-low" className="bg-slate-900">Price: High to Low</option>
              </select>
              <button onClick={handleReset} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Species Filter */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {speciesOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleSpeciesChange(option.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition ${
                  selectedSpecies === option.value 
                    ? "bg-pink-500 text-white border-transparent" 
                    : "bg-slate-900 text-slate-400 border-slate-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center py-24"><span className="loading loading-spinner text-pink-500"></span></div>
        ) : pets.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No companions found </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPetsPage;