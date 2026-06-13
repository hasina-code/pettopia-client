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

        {requests.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-2xl text-center border border-slate-800">No Requests Found</div>
        ) : (
          <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="p-3 md:p-4">Pet Name</th>
                  <th className="p-3 md:p-4">Request Date</th>
                  <th className="p-3 md:p-4 hidden md:table-cell">Pickup Date</th>
                  <th className="p-3 md:p-4">Status</th>
                  <th className="p-3 md:p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>{requests.map((request) => (
                <tr key={request._id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="p-3 md:p-4 font-semibold">{request.petName}</td>
                  <td className="p-3 md:p-4">{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 md:p-4 hidden md:table-cell">{request.pickupDate}</td>
                  <td className="p-3 md:p-4">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium capitalize ${
                      request.status === "approved" ? "bg-green-500/20 text-green-400" :
                      request.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}>{request.status}</span>
                  </td>
                  <td className="p-3 md:p-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                    <Link href={`/pet-details/${request.petId}`} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                      <Eye size={16} /> <span className="hidden md:inline">View</span>
                    </Link>
                    {request.status === 'pending' && (
                      <button 
                        onClick={() => { setSelectedRequestId(request._id); setSelectedPetName(request.petName); setIsModalOpen(true); }} 
                        className="text-red-400 hover:text-red-300 font-medium text-xs md:text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0b1329] border border-slate-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <XCircle size={24} />
              <h3 className="text-lg font-bold">Cancel Adoption Request</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">Are you sure you want to cancel your adoption request for <strong>{selectedPetName}</strong>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 font-semibold">Keep Request</button>
              <button onClick={handleConfirmCancel} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}