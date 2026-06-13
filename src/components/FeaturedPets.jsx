import PetCard from "./PetCard";

export default async function FeaturedPets() {
  let pets = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?limit=6`,
      { cache: "no-store" }
    );

    pets = await res.json();
  } catch (error) {
    console.error("Failed to fetch pets:", error);
  }

  return (
    <section className="relative py-24 px-6 bg-slate-950 text-slate-100 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase text-cyan-300 bg-slate-900 border border-slate-800 rounded-full">
            Featured Pets
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white mt-6">
            Find Your Perfect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
              Companion
            </span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            These adorable pets are ready for adoption. Give them a loving home and gain a loyal friend for life.
          </p>
        </div>

        {/* Grid */}
        {pets.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-semibold">No featured pets found 🐾</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="group transition-all duration-300 hover:-translate-y-2"
              >
                <PetCard pet={pet} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}