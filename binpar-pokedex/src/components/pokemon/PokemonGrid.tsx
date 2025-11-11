"use client";

import type { RouterOutputs } from "~/trpc/react";
import { PokemonCard } from "./PokemonCard";



type PokemonListItem = RouterOutputs["pokemon"]["list"][number];

export function PokemonGrid({
  data,
  onBeforeNavigate,
}: {
  data: PokemonListItem[];
  onBeforeNavigate?: () => void;
}) {
  return (
    <section className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onBeforeNavigate}
        />
      ))}
    </section>
  );
}
