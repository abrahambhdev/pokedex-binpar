"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePokemonListStore } from "~/lib/store/pokemonListStore";
import { api } from "~/trpc/react";


const PokemonFilters = dynamic(
  () => import("./PokemonFilters").then((m) => m.PokemonFilters),
  { ssr: false },
);

const PokemonGrid = dynamic(
  () => import("./PokemonGrid").then((m) => m.PokemonGrid),
  { ssr: false },
);

export const PokemonList = () => {
  const {
    type,
    generation,
    search,
    setType,
    setGeneration,
    setSearch,
    scrollY,
    setScrollY,
  } = usePokemonListStore();

  const { data, isLoading, isError, error } = api.pokemon.list.useQuery(
    { type, generation, search },
  );

  useEffect(() => {
    if (scrollY > 0) {
      window.scrollTo({ top: scrollY, behavior: "auto" });
    }
  }, [scrollY]);

  const handleBeforeNavigate = () => {
    setScrollY(window.scrollY);
  };

  return (
    <>
      <PokemonFilters
        type={type}
        generation={generation}
        search={search}
        onTypeChange={setType}
        onGenerationChange={setGeneration}
        onSearchChange={setSearch}
      />

      {isLoading && !data && (
        <div className="mt-4 text-sm text-slate-500">
          Cargando Pokémon desde PokéAPI...
        </div>
      )}

      {isError && (
        <div className="mt-4 text-sm text-red-500">
          Error al cargar Pokémon: {error.message}
        </div>
      )}

      {data && (
        <PokemonGrid
          data={data}
          onBeforeNavigate={handleBeforeNavigate}
        />
      )}
    </>
  );
};
