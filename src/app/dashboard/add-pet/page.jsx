"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"; 

const AddPetPage = ({ user }) => { 
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const petInfo = {
      ...data,
      adoptionFee: parseFloat(data.adoptionFee),
      ownerEmail: user?.email, 
      
    };

    try {
      const res = await axios.post("http://localhost:5000/pets", petInfo);
      if (res.data.insertedId) {
        toast.success("Pet added successfully!");
        reset();
      }
    } catch (error) {
      toast.error("Failed to add pet.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Add a New Pet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Pet Name" className="w-full p-3 rounded bg-slate-800 text-white" required />
        <input {...register("species")} placeholder="Species (e.g., Dog)" className="w-full p-3 rounded bg-slate-800 text-white" required />
        <input {...register("breed")} placeholder="Breed" className="w-full p-3 rounded bg-slate-800 text-white" />
        <input {...register("age")} placeholder="Age" className="w-full p-3 rounded bg-slate-800 text-white" />
        <input {...register("imageUrl")} placeholder="Image URL" className="w-full p-3 rounded bg-slate-800 text-white" required />
        <input {...register("adoptionFee")} type="number" placeholder="Adoption Fee" className="w-full p-3 rounded bg-slate-800 text-white" required />
        <textarea {...register("description")} placeholder="Description" className="w-full p-3 rounded bg-slate-800 text-white" />
        
        <button type="submit" className="w-full py-3 bg-pink-600 text-white font-bold rounded hover:bg-pink-700">
          Add Pet
        </button>
      </form>
    </div>
  );
};

export default AddPetPage;