import PetCard from "./PetCard";

export default async function FeaturedPets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pets?limit=6`, { cache: 'no-store' });
  const pets = await res.json();

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-black text-white mb-16 text-center">Featured Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
      </div>
    </section>
  );
}