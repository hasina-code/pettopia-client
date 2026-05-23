"use client";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { Heart } from "lucide-react";

const PetDetailsPage = ({ params }) => {
  const { id } = use(params);
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error("Error fetching pet", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!pet) return <div className="text-center py-20">Pet not found!</div>;

  return (
    
    <div className="min-h-screen bg-gray-400 py-5  mt-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
        
        <div className="space-y-6">
          <img src={pet.imageUrl} alt={pet.name} className="w-full h-60 object-cover rounded-3xl shadow-2xl" />
          
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-black">{pet.name}</h1>
            <p className="text-2xl font-bold text-pink-500">Fee: ${pet.adoptionFee}</p>
          </div>

        
          <div className="grid grid-cols-2 gap-4">
            <InfoCard title="Species" value={pet.species} />
            <InfoCard title="Breed" value={pet.breed} />
            <InfoCard title="Age" value={pet.age} />
            <InfoCard title="Gender" value={pet.gender} />
            <InfoCard title="Location" value={pet.location} />
            <InfoCard title="Health" value={pet.healthStatus} />
          </div>
          <div className="bg-[#151921] p-6 rounded-3xl border border-[#232a36]">
            <h3 className="text-xl font-bold mb-2">About {pet.name}</h3>
            <p className="text-gray-400 leading-relaxed">{pet.description}</p>
          </div>
        </div>

       
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Heart className="text-pink-500" /> Request to Adopt {pet.name}
          </h2>
          <form className="space-y-4">
            <input disabled value={pet.name} className="w-full p-4 bg-gray-50 rounded-lg border" />
            <input placeholder="Your Name" className="w-full p-4 rounded-lg border" />
            <input placeholder="Your Email" className="w-full p-4 rounded-lg border" />
            <input type="date" className="w-full p-4 rounded-lg border" />
            <textarea placeholder="Tell the owner why you'd be a great match..." className="w-full p-4 rounded-lg border h-24" />
             <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-cyan-400 hover:opacity-90 transition"
                >
                  Adopt {pet.name} 
                </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="p-4 border border-gray-200 rounded-lg">
    <p className="text-[10px] font-bold text-gray-500">{title}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default PetDetailsPage;