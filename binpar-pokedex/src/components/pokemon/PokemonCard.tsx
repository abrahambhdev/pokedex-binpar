"use client";

import Link from "next/link";
import type { RouterOutputs } from "~/trpc/react";


type PokemonListItem = RouterOutputs["pokemon"]["list"][number];

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const PokemonCard = ({
  pokemon,
  onClick,
}: {
  pokemon: PokemonListItem;
  onClick?: () => void;
}) => {
  const chain = pokemon.evolutionNames ?? [];

  const currentIndex = chain.findIndex(
    (name) => name.toLowerCase() === pokemon.name.toLowerCase(),
  );

  const evolutions =
    currentIndex >= 0 ? chain.slice(currentIndex + 1) : [];

  const predecessors =
    currentIndex > 0 ? chain.slice(0, currentIndex) : [];

  const formattedEvolutions = evolutions.map(capitalize).join(", ");
  const formattedPredecessors = predecessors
    .map(capitalize)
    .join(", ");
  const formattedChain = chain.map(capitalize).join(", ");

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      onClick={onClick}
      className="group flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>#{pokemon.id.toString().padStart(4, "0")}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 capitalize text-slate-600">
          {pokemon.generation.replace("generation-", "Gen ")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {pokemon.image && (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-16 w-16 flex-shrink-0 object-contain transition group-hover:scale-110"
          />
        )}
        <div className="flex flex-1 flex-col">
          <h2 className="text-lg font-semibold capitalize text-slate-800">
            {pokemon.name}
          </h2>
          <div className="mt-1 flex flex-wrap gap-1">
            {pokemon.types.map((t) => (
              <span
                key={t}
                className="rounded-full bg-sky-50 px-2 py-0.5 text-[9px] capitalize text-sky-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {formattedEvolutions && (
        <p className="mt-1 line-clamp-1 text-[9px] text-slate-600">
          <span className="font-semibold">Evoluciones:</span>{" "}
          {formattedEvolutions}
        </p>
      )}

      {formattedPredecessors && (
        <p className="line-clamp-1 text-[9px] text-slate-600">
          <span className="font-semibold">Pre-evoluciones:</span>{" "}
          {formattedPredecessors}
        </p>
      )}

      {chain.length > 1 && (
        <p className="line-clamp-1 text-[8px] text-slate-500">
          <span className="font-semibold">Cadena evolutiva:</span>{" "}
          {formattedChain}
        </p>
      )}
    </Link>
  );
};
