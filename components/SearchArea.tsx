"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Image from "next/image";

import { RootState } from "@/redux/store";
import { addPokemon } from "@/redux/teamsSlice";

import { fetchPokemon } from "@/lib/fetchPokemon";
import { Pokemon } from "@/lib/types";

export default function SearchArea() {
  const dispatch = useDispatch();

  const activeTeamId = useSelector((s: RootState) => s.teams.activeTeamId);
  const teams = useSelector((s: RootState) => s.teams.teams);

  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);
      const pok = await fetchPokemon(query);
      console.log(pok);
      setPokemon(pok);
    } catch {
      toast.error("Pokemon not found");
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    if (!pokemon || !activeTeamId) {
      toast.error("No active team selected");
      return;
    }

    const team = teams.find((t) => t.id === activeTeamId);
    if (!team) return;

    if (team.members.find((m) => m.id === pokemon.id)) {
      toast.error("This Pokemon is already in the team");
      return;
    }
    if (team.members.length >= 6) {
      toast.error("Team is full (max 6)");
      return;
    }

    dispatch(addPokemon({ teamId: activeTeamId, pokemon }));

    toast.success(`${pokemon.name} added to team`);
  }

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2"
          placeholder="Search Pokemon..."
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "..." : "Search"}
        </button>

        <button
          onClick={() => {
            setQuery("");
            setPokemon(null);
          }}
          className="px-3 py-2 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {pokemon && (
        <div className="mt-4 flex items-center gap-4 p-4 bg-white rounded-xl shadow">
          <Image
            src={pokemon.sprites.front_default ?? ""}
            alt={pokemon.name}
            width={64}
            height={64}
          />

          <div className="flex-1">
            <h3 className="font-semibold capitalize">{pokemon.name}</h3>

            <div className="text-xs text-slate-600">
              Types: {pokemon.types.map((t) => t.name).join(", ")}
            </div>

            <div className="text-xs text-slate-600">
              Base XP: {pokemon.base_experience}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="px-3 py-2 rounded-lg bg-green-500 text-white cursor-pointer"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
