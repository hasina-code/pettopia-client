"use client";

import {
  FaPaw,
  FaDog,
  FaMapMarkerAlt,
  FaSyringe,
  FaHeartbeat,
  FaCalendarAlt,
  FaVenusMars,
  FaInfoCircle,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import AdoptionSuccessModal from "@/components/AdoptionSuccessModal";
import OwnerWarningModal from "@/components/OwnerWarningModal";
import InputField from "@/components/InputField";
import InfoBox from "@/components/InfoBox";
import api from "@/lib/axios";

export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const [formData, setFormData] = useState({
    pickupDate: "",
    message: "",
  });

  // Login check
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  // Fetch pet
  useEffect(() => {
    if (!id) return;

const fetchPet = async () => {
  try {
    const res = await api.get(`/pets/${id}`); 
   
    setPet(res.data); 
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    fetchPet();
  }, [id]);
const handleAdoptionRequest = async (e) => {
  e.preventDefault();

  if (!user) {
    toast.error("Please login first");
    return;
  }

  if (user.email === pet.ownerEmail) {
    toast.error("You cannot adopt your own pet!");
    setShowWarningModal(true);
    return;
  }

  try {
  const token = session?.token || session?.accessToken;
    const res = await api.post('/adoption-requests', {
      petId: pet._id,
        petName: pet.name,
        petImage: pet.image || pet.imageUrl,
        ownerEmail: pet.ownerEmail,
        userName: user.name,
        userEmail: user.email,
        pickupDate: formData.pickupDate,
        message: formData.message,
   }, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data.insertedId) {
      toast.success("Request sent!");
      setShowModal(true);

      setFormData({
        pickupDate: "",
        message: "",
      });
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed");
  }
};

  if (isPending || loading) {
    return (
      <div className="text-center py-20 text-white">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!pet) {
    return (
      <div className="text-center py-20 text-red-500">
        Pet Not Found
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT */}
       <div>
  <img
    src={pet.imageUrl || pet.image}
    className="w-full h-[400px] object-cover rounded-xl"
  />

  <h1 className="text-3xl font-bold mt-4">{pet.name}</h1>

 <div className="grid grid-cols-2 gap-3 mt-4">
  <InfoBox label="Species" value={pet.species} icon={FaPaw} />
  <InfoBox label="Breed" value={pet.breed} icon={FaDog} />

  <InfoBox label="Age" value={pet.age} icon={FaCalendarAlt} />
  <InfoBox label="Gender" value={pet.gender} icon={FaVenusMars} />

  <InfoBox label="Location" value={pet.location} icon={FaMapMarkerAlt} />
  <InfoBox
    label="Vaccination"
    value={pet.vaccinationStatus}
    icon={FaSyringe}
  />

  <InfoBox label="Health" value={pet.healthStatus} icon={FaHeartbeat} />

  {/* Status */}
  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
    <FaInfoCircle className="text-pink-500 text-lg" />

    <div>
      <p className="text-gray-400 text-xs">Status</p>

      <h3
        className={`font-semibold capitalize ${
          pet.status === "available"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {pet.status}
      </h3>
    </div>
  </div>
</div>

  <p className="mt-4 text-gray-300">{pet.description}</p>
</div>

        {/* RIGHT */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Adopt Pet</h2>

          <form onSubmit={handleAdoptionRequest} className="space-y-4">

            <InputField label="Pet Name" value={pet.name} readOnly />
            <InputField label="User Name" value={user?.name || ""} readOnly />
            <InputField label="User Email" value={user?.email || ""} readOnly />

            <input
              type="date"
              required
              value={formData.pickupDate}
              onChange={(e) =>
                setFormData({ ...formData, pickupDate: e.target.value })
              }
              className="w-full p-3 bg-slate-800 rounded-lg"
            />

            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 bg-slate-800 rounded-lg"
              placeholder="Why adopt this pet?"
            />

            <button
              type="submit"
              disabled={pet.status === "adopted" || !user}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl"
            >
              {pet.status === "adopted"
                ? "Already Adopted"
                : "Adopt Now"}
            </button>
          </form>
        </div>
      </div>

      <AdoptionSuccessModal
        open={showModal}
        onViewRequests={() => router.push("/dashboard/my-requests")}
      />

      <OwnerWarningModal
        open={showWarningModal}
        onClose={() => setShowWarningModal(false)}
      />
    </div>
  );
}