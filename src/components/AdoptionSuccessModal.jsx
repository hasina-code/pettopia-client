"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function AdoptionSuccessModal({
  open,
  onViewRequests,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-md w-full text-center">
        <div className="text-6xl text-green-500 mb-4 flex justify-center">
          <FaCheckCircle />
        </div>

        <h2 className="text-2xl font-bold mb-2">
          Request Submitted
        </h2>

        <p className="text-gray-400 mb-6">
          Your adoption request has been sent successfully.
        </p>

        <button
          onClick={onViewRequests}
          className="w-full bg-slate-800 py-3 rounded-xl font-semibold hover:bg-slate-700 transition"
        >
          View My Requests
        </button>
      </div>
    </div>
  );
}