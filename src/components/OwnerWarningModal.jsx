"use client";

import { FaExclamationTriangle } from "react-icons/fa";

export default function OwnerWarningModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] border border-yellow-500/30 rounded-3xl p-8 w-full max-w-md text-center shadow-2xl">

        <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center mb-5">
          <span className="text-5xl text-yellow-500">
            <FaExclamationTriangle />
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-3">
          This is your listing
        </h2>

        <p className="text-slate-400 mb-6">
          You cannot request adoption for your own pet.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
        >
          Close
        </button>

      </div>
    </div>
  );
}