import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PokemonHeader } from "~/components/pokemon/PokemonHeader";

const PokemonStats = dynamic(
  () =>
    import("~/components/pokemon/PokemonStats").then(
      (m) => m.PokemonStats,
    ),
  {
    loading: () => (
      <div className="text-xs text-slate-500">
        Cargando estadísticas...
      </div>
    ),
  },
);

const PokemonEvolutionChain = dynamic(
  () =>
    import("~/components/pokemon/PokemonEvolutionChain").then(
      (m) => m.PokemonEvolutionChain,
    ),
  {
    loading: () => (
      <div className="text-xs text-slate-500">
        Cargando cadena evolutiva...
      </div>
    ),
  },
);

type Params = { params: { name: string } };

export default async function PokemonDetailPage({ params }: Params) {
  const name = params.name.toLowerCase();

  let pokemon = null;
  try {
    pokemon = await api.pokemon.detail({ name });
  } catch {
    pokemon = null;
  }

  if (!pokemon) notFound();

  return (
    <main className="flex flex-col gap-6">
      <Link
        href="/"
        className="text-xs text-sky-600 hover:underline"
      >
        ← Volver al listado
      </Link>

      <PokemonHeader pokemon={pokemon} />

      {pokemon.stats.length > 0 && (
        <PokemonStats stats={pokemon.stats} />
      )}

      {pokemon.evolutionChain.length > 1 && (
        <PokemonEvolutionChain
          chain={pokemon.evolutionChain}
          currentName={pokemon.name}
        />
      )}
    </main>
  );
}
