import Sidebar from "@/components/Sidebar";
import SearchArea from "@/components/SearchArea";
import TeamStatsSection from "@/components/TeamStatsSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-white p-4">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <Sidebar />

        <main>
          <h1 className="text-3xl font-bold mb-2">Pokemon Team Builder</h1>

          <p className="text-sm text-slate-500 mb-4">
            Create teams, add Pokemon, and view quick stats.
          </p>

          <SearchArea />

          <TeamStatsSection />
        </main>
      </div>
    </div>
  );
}
