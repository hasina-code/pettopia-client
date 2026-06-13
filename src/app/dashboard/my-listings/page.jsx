"use client";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

import RequestsModal from "@/components/RequestsModal";
import { Plus, Trash2, Edit3, Eye, Inbox, PawPrint, CheckCircle2 } from "lucide-react";
import DeletePetModal from "@/components/DeletePetModal";

export default function MyListingsPage() {
 
const { data: session, isPending } = useSession();
const user = session?.user;
const loading = isPending;


  const [pets, setPets] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
const [deleteModal, setDeleteModal] = useState(false);
const [selectedPet, setSelectedPet] = useState(null);
const [selectedPetName, setSelectedPetName] = useState("");

 useEffect(() => {
  if (!loading && user?.email) {
    fetchPets();
  } else if (!loading) {
    setPageLoading(false);
  }
}, [user, loading]);

  const fetchPets = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-pets/${user.email}`,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    setPets(res.data); 

  } catch (error) {
    console.error(error);
    toast.error("Failed to load pets");
  } finally {
    setPageLoading(false);
  }
};

  const confirmDelete = async () => {
  try {
 await axios.delete(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${selectedPet._id}`,
  {
    withCredentials: true,
  }
);

    toast.success("Pet deleted successfully");

    setPets((prev) =>
      prev.filter((pet) => pet._id !== selectedPet._id)
    );

    setDeleteModal(false);
    setSelectedPet(null);

  } catch (error) {
    toast.error("Delete failed");
  }
};

  if (loading || pageLoading) {
    return <div className="min-h-screen flex justify-center items-center bg-slate-950 text-pink-500"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Listings</span></h1>
            <p className="text-slate-400 mt-2">Manage your pet profile and track adoption requests.</p>
          </div>
          <Link href="/dashboard/add-pet" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 transition-all font-semibold shadow-lg shadow-pink-900/20">
            <Plus size={20} /> Add New Pet
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Listings", val: pets.length, color: "text-white" },
            { label: "Available", val: pets.filter(p => p.status === "available").length, color: "text-green-400" },
            { label: "Adopted", val: pets.filter(p => p.status === "adopted").length, color: "text-red-400" }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
              <h3 className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</h3>
              <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Pet Grid */}
        {pets.length === 0 ? (
          <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl py-20 text-center">
            <PawPrint size={60} className="mx-auto text-slate-700 mb-4" />
            <h2 className="text-2xl font-bold">No Listings Found</h2>
            <p className="text-slate-500 mt-2 mb-6">Start by adding your first pet listing!</p>
            <Link href="/dashboard/add-pet" className="px-6 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition">Add Pet</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet._id} className="group bg-slate-900 rounded-2xl border border-slate-800 hover:border-pink-500/50 transition-all overflow-hidden shadow-xl">
                <div className="relative h-60 overflow-hidden">
   <Image 
  src={(pet.imageUrl || pet.image)?.trim()} 
  alt={pet.name || "Pet image"} 
  width={500} 
  height={300} 
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
  unoptimized 
/>
  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                    {pet.status.toUpperCase()}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold truncate">{pet.name}</h2>
                  <p className="text-slate-400 text-sm mb-4">{pet.species} • {pet.breed}</p>
                  <p className="text-pink-500 text-2xl font-black mb-6">${pet.adoptionFee}</p>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { setSelectedPetId(pet._id); setOpenModal(true); }} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-2.5 rounded-lg transition text-sm">
                      <Inbox size={16} /> Requests
                    </button>
                    <Link href={`/dashboard/update-pet/${pet._id}`} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-yellow-600/40 text-yellow-500 py-2.5 rounded-lg transition text-sm">
                      <Edit3 size={16} /> Edit
                    </Link>
                    <Link href={`/pet-details/${pet._id}`} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-cyan-600/40 text-cyan-500 py-2.5 rounded-lg transition text-sm">
                      <Eye size={16} /> View
                    </Link>
 <button
  onClick={() => {
    setSelectedPet(pet);
    setDeleteModal(true);
  }}
  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-600/40 text-red-500 py-2.5 rounded-lg transition text-sm"
>
  <Trash2 size={16} />
  Delete
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

  <RequestsModal
  petId={selectedPetId}
  petName={selectedPetName}
  open={openModal}
  onClose={() => setOpenModal(false)}
  onAction={fetchPets}
/>

<DeletePetModal
  open={deleteModal}
  pet={selectedPet}
  onClose={() => {
    setDeleteModal(false);
    setSelectedPet(null);
  }}
  onConfirm={confirmDelete}
/>
    </div>
  );
}