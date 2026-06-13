export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
      {/* হেডার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Dashboard Overview
          </h1>
          <p className="text-slate-400 mt-1">Manage your pets and adoption requests efficiently.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-xl font-semibold transition-all shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)]">
          + Add New Pet
        </button>
      </div>

      {/* স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Pets", count: "12", color: "from-blue-500 to-cyan-500" },
          { title: "Pending", count: "3", color: "from-amber-500 to-orange-500" },
          { title: "Approved", count: "8", color: "from-emerald-500 to-teal-500" },
          { title: "Rejected", count: "1", color: "from-rose-500 to-red-500" },
        ].map((item, index) => (
          <div key={index} className="relative overflow-hidden bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 blur-2xl rounded-full`} />
            <h3 className="text-slate-400 text-sm">{item.title}</h3>
            <p className="text-4xl font-bold mt-2">{item.count}</p>
          </div>
        ))}
      </div>

      {/* গ্রিড লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* এক্টিভিটি সেকশন */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-6">Recent Requests</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">🐾</div>
                <div>
                  <p className="font-medium">New adoption request</p>
                  <p className="text-xs text-slate-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* কুইক অ্যাকশন */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-6">System Status</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Profile Completion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-pink-500 h-full w-[85%] rounded-full"></div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-500/20">
              <p className="text-sm font-medium">Pro Tip:</p>
              <p className="text-xs text-slate-300 mt-1">Keep your pet photos high quality to get more adoption requests!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}