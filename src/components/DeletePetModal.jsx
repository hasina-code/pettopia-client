"use client";

import { Trash2 } from "lucide-react";

export default function DeletePetModal({
  open,
  pet,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-[#0f172a] border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-800">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <Trash2 size={20} className="text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-white">
              Delete Pet Listing
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-slate-300">
            Are you sure you want to permanently delete
            <span className="font-bold text-white">
              {" "}
              {pet?.name}
            </span>
            's listing?
          </p>

          <p className="text-red-400 text-sm mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-5 flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold transition"
          >
            Keep Listing
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 py-3 rounded-xl font-semibold text-white transition"
          >
            Delete Permanently
          </button>

        </div>

      </div>

    </div>
  );
}