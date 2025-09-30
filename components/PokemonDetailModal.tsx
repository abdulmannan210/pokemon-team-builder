"use client";

import Image from "next/image";

import Modal from "@/components/Modal";

import { Pokemon } from "@/lib/types";

interface PokemonDetailModalProps {
  open: boolean;
  onClose: () => void;
  pokemon?: Pokemon;
}

export default function PokemonDetailModal({
  open,
  onClose,
  pokemon,
}: PokemonDetailModalProps) {
  if (!pokemon) return null;

  return (
    <Modal open={open} title={pokemon.name.toUpperCase()} onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={120}
          height={120}
        />

        <div className="flex gap-2">
          {pokemon.types.map((t, ind) => (
            <span
              key={ind}
              className="px-2 py-1 rounded-lg bg-gray-200 text-sm capitalize"
            >
              {t.name}
            </span>
          ))}
        </div>

        <p className="text-sm opacity-80">Base XP: {pokemon.base_experience}</p>
      </div>
    </Modal>
  );
}
