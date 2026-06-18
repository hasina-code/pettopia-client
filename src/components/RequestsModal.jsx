"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Heart,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
  User,
  MessageSquare,
  Loader2,
  Check,
  X,
  Clock
} from "lucide-react";
import api from "@/lib/axios";

export default function RequestsModal({
  petId,
  petName,
  open,
  onClose,
  onAction
}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (open && petId) {
    fetchRequests();
  }
}, [open, petId]);

  const fetchRequests = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token"); 
    const res = await api.get(`/pet-requests/${petId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setRequests(res.data);

  } catch (error) {
    console.error(error);
    toast.error("Failed to load requests");
  } finally {
    setLoading(false);
  }
};
const handleApprove = async (requestId) => {
  try {
    const token = localStorage.getItem("token");
    await api.patch(`/approve-request/${requestId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
      toast.success("Request Approved");
      fetchRequests();
      if (onAction) onAction();
    } catch (error) {
      toast.error("Approve Failed");
    }
  };

  const handleReject = async (requestId) => {
  try {
    const token = localStorage.getItem("token"); 
    await api.patch(`/reject-request/${requestId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success("Request Rejected");
    fetchRequests();
    if (onAction) onAction();
  } catch (error) {
    toast.error("Reject Failed");
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="text-pink-500" size={20} /> 
            Adoption Requests for {petName || "this pet"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition text-2xl">✕</button>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-pink-500" size={40} />
          </div>
        ) : requests.length === 0 ? (
          // Empty State
          <div className="text-center py-20 px-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-pink-500/10 flex items-center justify-center mb-6">
              <Heart size={50} className="text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No requests yet for {petName || "this pet"}
            </h3>
            <p className="text-slate-400">
              When users submit adoption requests, they will appear here.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {requests.map((request) => (
              <div key={request._id} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white text-lg">{request.userName}</h3>
                    <p className="text-slate-400 text-sm">{request.userEmail}</p>
                  </div>
                  
                  {/* Status Badges */}
                  {request.status === "approved" ? (
                    <span className="text-green-400 text-xs font-bold bg-green-900/20 px-3 py-1 rounded-full border border-green-900/50 flex items-center gap-1">
                      <CheckCircle size={12} /> Approved
                    </span>
                  ) : request.status === "rejected" ? (
                    <span className="text-red-400 text-xs font-bold bg-red-900/20 px-3 py-1 rounded-full border border-red-900/50 flex items-center gap-1">
                      <XCircle size={12} /> Rejected
                    </span>
                  ) : (
                    <span className="text-yellow-400 text-xs font-bold bg-yellow-900/20 px-3 py-1 rounded-full border border-yellow-900/50 flex items-center gap-1">
                      <Clock size={12} /> Pending
                    </span>
                  )}
                </div>

                <div className="flex gap-4 text-xs text-slate-400 mb-4">
                  <span>Pickup: <span className="text-white">{request.pickupDate}</span></span>
                  <span>Requested: <span className="text-white">{new Date(request.createdAt).toLocaleDateString()}</span></span>
                </div>

                <div className="bg-[#0f172a] p-3 rounded-lg text-slate-300 text-sm italic border border-slate-700/50 mb-4">
                  {request.message}
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(request._id)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-bold text-sm transition">
                      Approve
                    </button>
                    <button onClick={() => handleReject(request._id)} className="flex-1 bg-rose-900/40 hover:bg-rose-900/60 text-rose-400 border border-rose-900/50 py-2 rounded-lg font-bold text-sm transition">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}