"use client";

import Link from "next/link";

type Evo = { id: number; name: string; image: string };

export function PokemonEvolutionChain({
  chain,
  currentName,
}: {
  chain: Evo[];
  currentName: string;
}) {
  const current = currentName.toLowerCase();

  return (
    <section className="rounded-2xl bg-white/90 p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-600">
        Cadena evolutiva
      </h2>
      <div className="flex flex-wrap gap-4">
        {chain.map((evo) => {
          const isActive = evo.name.toLowerCase() === current;
          return (
            <Link
              key={evo.id}
              href={`/pokemon/${evo.name}`}
              className={[
                "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] capitalize transition",
                isActive
                  ? "border border-sky-500 bg-sky-50"
                  : "border border-transparent bg-slate-50 hover:border-sky-300 hover:bg-sky-50",
              ].join(" ")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={evo.image}
                alt={evo.name}
                className="h-16 w-16 object-contain"
              />
              <span>{evo.name}</span>
              {isActive && (
                <span className="text-[8px] font-semibold uppercase text-sky-600">
                  Actual
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
