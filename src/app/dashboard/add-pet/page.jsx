"use client";

import { useState } from "react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PawPrint, UploadCloud, Save, X } from "lucide-react"; 
import api from "@/lib/axios";

export default function AddPetPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const token = session?.token || session?.accessToken; 
  console.log("TOKEN:", token);

  const petData = {
    name: form.petName.value,
    species: form.species.value,
    breed: form.breed.value,
    age: form.age.value,
    gender: form.gender.value,
    imageUrl: form.image.value,
    healthStatus: form.healthStatus.value,
    vaccinationStatus: form.vaccinationStatus.value,
    location: form.location.value,
    adoptionFee: Number(form.adoptionFee.value),
    description: form.description.value,
    ownerEmail: session?.user?.email,
    ownerName: session?.user?.name,
    adopted: false,
    status: "available",
    createdAt: new Date(),
  };

  try {
    setLoading(true);

    await api.post('/pets', petData, {
        headers: { Authorization: `Bearer ${token}` }
      });

    toast.success("Pet added successfully!");
    router.push("/dashboard/my-listings");

  } catch (error) {
    toast.error("Failed to add pet");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#020817] p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-[#0f172a] p-8 rounded-3xl shadow-2xl border border-slate-800 backdrop-blur-sm">
        {/* Title Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3">
            <PawPrint className="text-pink-500" size={35} /> Add New <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Pet Listing</span>
          </h2>
          <p className="text-slate-400 mt-2">Help a pet find their forever home by creating a detailed listing.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Fields with enhanced styling */}
          {[
            { label: "Pet Name", name: "petName", type: "text", placeholder: "e.g. Buddy" },
            { label: "Breed", name: "breed", type: "text", placeholder: "e.g. Labrador" },
            { label: "Age", name: "age", type: "text", placeholder: "e.g. 2 Years" },
            { label: "Image URL", name: "image", type: "text", placeholder: "https://i.ibb.co/..." },
            { label: "Health Status", name: "healthStatus", type: "text", placeholder: "e.g. Healthy" },
            { label: "Vaccination", name: "vaccinationStatus", type: "text", placeholder: "e.g. Fully Vaccinated" },
            { label: "Location", name: "location", type: "text", placeholder: "e.g. New York, NY" },
            { label: "Adoption Fee ($)", name: "adoptionFee", type: "number", placeholder: "0 for free" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
              <input name={field.name} type={field.type} required placeholder={field.placeholder} className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-xl text-white focus:border-pink-500 transition outline-none" />
            </div>
          ))}

          {/* Select Fields */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Species</label>
            <select name="species" required className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-xl text-white outline-none">
              <option value="">Select Species</option>
              <option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gender</label>
            <select name="gender" required className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-xl text-white outline-none">
              <option value="">Select Gender</option>
              <option>Male</option><option>Female</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
            <textarea name="description" rows={4} required placeholder="Tell us more about the pet..." className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-xl text-white focus:border-pink-500 transition outline-none" />
          </div>

<div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
  <button
    type="button"
    onClick={() => router.back()}
    className="flex items-center justify-center gap-2 flex-1 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold text-lg transition-all"
  >
    <X size={20} />
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-pink-900/20"
  >
    {loading ? (
      "Adding Listing..."
    ) : (
      <>
        <Save size={20} />
        Add Pet Listing
      </>
    )}
  </button>
</div>
        </form>
      </div>
    </div>
  );
}