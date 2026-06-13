"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { XCircle, Loader2, Eye } from "lucide-react";
import { useSession } from "@/lib/auth-client";


export default function MyRequestsPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const loading = isPending;
  const [requests, setRequests] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedPetName, setSelectedPetName] = useState("");

  useEffect(() => {
    if (!loading && user?.email) fetchRequests();
    else if (!loading && !user) setPageLoading(false);
  }, [user, loading]);

  const fetchRequests = async () => {
    try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-requests/${user.email}`
    );

    setRequests(res.data);
  } catch (error) {
    console.log(error);
    toast.error("Failed to load requests");
  } finally {
    setPageLoading(false);
  }
};

  const total = requests.length;
  const pending = requests.filter(r => r.status === 'pending').length;
  const approved = requests.filter(r => r.status === 'approved').length;
  const rejected = requests.filter(r => r.status === 'rejected').length;

  const handleConfirmCancel = async () => {
    try {
      await axios.delete(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/${selectedRequestId}`
);
      toast.success("Request cancelled successfully");
      setRequests(requests.filter((r) => r._id !== selectedRequestId));
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to cancel request");
    }
  };

  if (loading || pageLoading) return <div className="min-h-screen flex justify-center items-center bg-slate-950"><Loader2 className="animate-spin text-pink-500" size={40} /></div>;

  return (
   
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Adoption Requests</span></h1>
        <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-base">Track the status of all your adoption requests here.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {[ { label: 'Total', value: total, color: 'text-white' }, 
             { label: 'Pending', value: pending, color: 'text-yellow-500' }, 
             { label: 'Approved', value: approved, color: 'text-green-500' }, 
             { label: 'Rejected', value: rejected, color: 'text-red-500' } 
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-4 md:p-6 rounded-2xl text-center">
              <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-xs md:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

       
    
  );
}