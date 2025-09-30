"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

export default function TeamStatsSection() {
  const teams = useSelector((state: RootState) => state.teams.teams);
  const activeTeamId = useSelector(
    (state: RootState) => state.teams.activeTeamId
  );

  const activeTeam = teams.find((t) => t.id === activeTeamId) ?? null;

  if (!activeTeam) return null;

  const types = Array.from(
    new Set(activeTeam.members.flatMap((m) => m.types.map((t) => t.name)))
  );

  const avgXP =
    activeTeam.members.length > 0
      ? Math.round(
          activeTeam.members.reduce((a, b) => a + b.base_experience, 0) /
            activeTeam.members.length
        )
      : 0;

  return (
    <div className="mt-6 p-4 rounded-xl bg-slate-50 border">
      <h2 className="text-lg font-bold mb-2">Team Stats</h2>

      <p className="text-sm">Total Pokemon: {activeTeam.members.length}</p>

      <p className="text-sm">Types: {types.join(", ") || "None"}</p>

      <p className="text-sm">Average Base Experience: {avgXP}</p>
    </div>
  );
}
