"use client";

import { api } from "~/trpc/react";


type Props = {
  type?: string;
  generation?: string;
  search: string;
  onTypeChange: (t?: string) => void;
  onGenerationChange: (g?: string) => void;
  onSearchChange: (v: string) => void;
};

export function PokemonFilters({
  type,
  generation,
  search,
  onTypeChange,
  onGenerationChange,
  onSearchChange,
}: Props) {
  const { data: meta } = api.pokemon.meta.useQuery();

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur md:flex-row md:items-end">
      <div className="flex-1">
        <label className="text-[10px] font-semibold uppercase text-slate-500">
          Buscar por nombre o evolución
        </label>
        <input
          type="text"
          placeholder="Ej: pikachu (verás Pichu, Pikachu y Raichu)"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
        />
      </div>
      <div className="flex flex-1 gap-3">
        <div className="w-1/2">
          <label className="text-[10px] font-semibold uppercase text-slate-500">
            Tipo
          </label>
          <select
            value={type ?? ""}
            onChange={(e) => onTypeChange(e.target.value || undefined)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          >
            <option value="">Todos</option>
            {meta?.types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <label className="text-[10px] font-semibold uppercase text-slate-500">
            Generación
          </label>
          <select
            value={generation ?? ""}
            onChange={(e) =>
              onGenerationChange(e.target.value || undefined)
            }
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          >
            <option value="">Todas</option>
            {meta?.generations.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
