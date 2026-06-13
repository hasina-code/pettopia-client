"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, PawPrint, Save, X } from "lucide-react";

export default function UpdatePetPage() {
  const { id } = useParams();
  const router = useRouter();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
       const res = await axios.get(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
  {
    withCredentials: true,
  }
);

        console.log("Pet Data:", res.data);
        setPet(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load pet data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPet();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedPet = {
      name: form.petName.value,
      species: form.species.value,
      breed: form.breed.value,
      age: form.age.value,
      gender: form.gender.value,
      imageUrl: form.image.value,
      healthStatus: form.healthStatus.value,
      location: form.location.value,
      adoptionFee: Number(form.adoptionFee.value),
      description: form.description.value,
    };

    try {
 const res = await axios.put(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
  updatedPet,
  {
    withCredentials: true,
  }
);
     
     

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        toast.success("Pet Updated Successfully");
        router.push("/dashboard/my-listings");
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0a0f1c]">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#0a0f1c] text-slate-300 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to My Listings</span>
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Update{" "}
          <span className="text-pink-500">
            {pet?.name || "Pet"}
          </span>
          's Listing
        </h1>

        <div className="bg-[#161b2b] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="flex items-center gap-2 mb-8 text-white text-xl font-semibold">
            <PawPrint className="text-pink-500" />
            <h2>Pet Information</h2>
          </div>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Pet Name */}
            <div className="form-control">
              <label className="label text-slate-400">
                Pet Name *
              </label>
              <input
                name="petName"
                defaultValue={pet?.name || ""}
                className="input bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            {/* Species */}
            <div className="form-control">
              <label className="label text-slate-400">
                Species *
              </label>
              <select
                name="species"
                defaultValue={pet?.species || ""}
                className="select bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              >
                <option value="">Select Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Breed */}
            <div className="form-control">
              <label className="label text-slate-400">
                Breed
              </label>
              <input
                name="breed"
                defaultValue={pet?.breed || ""}
                className="input bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            {/* Age */}
            <div className="form-control">
              <label className="label text-slate-400">
                Age
              </label>
              <input
                name="age"
                type="text"
                defaultValue={pet?.age || ""}
                placeholder="e.g. 2 Years, 6 Months"
                className="input bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            {/* Gender */}
            <div className="form-control">
              <label className="label text-slate-400">
                Gender
              </label>
              <select
                name="gender"
                defaultValue={pet?.gender || ""}
                className="select bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            {/* Adoption Fee */}
            <div className="form-control">
              <label className="label text-slate-400">
                Adoption Fee
              </label>
              <input
                name="adoptionFee"
                type="number"
                defaultValue={pet?.adoptionFee || ""}
                className="input bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            {/* Image URL */}
            <div className="form-control md:col-span-2">
              <label className="label text-slate-400">
                Image URL
              </label>
              <input
                name="image"
                defaultValue={pet?.imageUrl || ""}
                className="input bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            {/* Health Status */}
            <div className="form-control">
              <label className="label text-slate-400">
                Health Status
              </label>
              <input
                name="healthStatus"
                defaultValue={pet?.healthStatus || ""}
                className="input bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label text-slate-400">
                Location
              </label>
              <input
                name="location"
                defaultValue={pet?.location || ""}
                className="input bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label text-slate-400">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                defaultValue={pet?.description || ""}
                className="textarea bg-[#1e2538] border-slate-700 text-white w-full rounded-xl"
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-8">
  <button
    type="button"
    onClick={() => router.push("/dashboard/my-listings")}
    className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold transition-all duration-300 hover:scale-105"
  >
    <X size={18} />
    Cancel
  </button>

  <button
    type="submit"
    disabled={updating}
    className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-900/30"
  >
    {updating ? (
      <>
        <span className="loading loading-spinner loading-sm"></span>
        Updating...
      </>
    ) : (
      <>
        <Save size={18} />
        Save Changes
      </>
    )}
  </button>
</div>
          </form>
        </div>
      </div>
    </div>
   
  );
}