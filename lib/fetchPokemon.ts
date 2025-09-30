import { Pokemon } from "./types";

export async function fetchPokemon(query: string): Promise<Pokemon> {
  const q = query.trim().toLowerCase();

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q)}`
  );
  if (!res.ok) throw new Error("Not found");

  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    sprites: { front_default: data.sprites.front_default },
    types: data.types.map((t: { type: { name: string } }) => ({
      name: t.type.name,
    })),
    base_experience: data.base_experience ?? 0,
  };
}
