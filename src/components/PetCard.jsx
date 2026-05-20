import Link from "next/link";
import { MapPin, DollarSign, PawPrint, Calendar, Tag } from "lucide-react";

export default function PetCard({ pet }) {
  return (
    <div className="group bg-[#0b1120] border border-slate-800 rounded-3xl p-5 transition-all duration-300 hover:border-pink-500/50 hover:shadow-2xl">
      
    
      <div className="relative h-60 overflow-hidden rounded-2xl mb-5">
        <img 
          src={pet.imageUrl} 
          alt={pet.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
     
        <div className="absolute top-4 left-4">
          <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
            {pet.status}
          </span>
        </div>
      </div>

     
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-black text-white">{pet.name}</h3>
          <div className="flex items-center text-pink-400 font-bold text-sm bg-pink-500/10 px-2 py-0.5 rounded-lg">
            <DollarSign size={14} /> {pet.adoptionFee}
          </div>
        </div>
        <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
          <Tag size={12} /> {pet.breed}
        </p>
      </div>

      
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-[#131b2e] p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <PawPrint size={14} className="text-cyan-400" />
          <span className="text-[10px] text-slate-400 font-bold uppercase">{pet.species}</span>
        </div>
        <div className="bg-[#131b2e] p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <Calendar size={14} className="text-cyan-400" />
          <span className="text-[10px] text-slate-400 font-bold uppercase">{pet.age}</span>
        </div>
        <div className="col-span-2 bg-[#131b2e] p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
          <MapPin size={14} className="text-cyan-400" />
          <span className="text-[10px] text-slate-400 font-bold uppercase truncate">{pet.location}</span>
        </div>
      </div>

    
      <div className="flex gap-2">
        <Link 
          href={`/pet-details/${pet._id}`} 
          className="flex-1 text-center py-3 rounded-xl text-xs font-bold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
        >
          View Details
        </Link>
        <Link 
          href={`/pet-details/${pet._id}`} 
          className="flex-1 text-center py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 to-cyan-500 text-white hover:opacity-90 transition-all"
        >
          ADOPT Now
        </Link>
      </div>
    </div>
  );
}