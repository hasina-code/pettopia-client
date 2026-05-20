export default function FoodGuide() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <h2 className="text-3xl font-black text-white mb-8">Pet Nutrition Guide</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400">
        <div className="p-4 bg-slate-900 rounded-xl">Protein Rich Diet</div>
        <div className="p-4 bg-slate-900 rounded-xl">Hydration Importance</div>
        <div className="p-4 bg-slate-900 rounded-xl">Avoid Toxic Foods</div>
        <div className="p-4 bg-slate-900 rounded-xl">Healthy Supplements</div>
      </div>
    </section>
  );
}