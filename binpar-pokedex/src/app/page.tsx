import dynamic from "next/dynamic";

const PokemonList = dynamic(
  () =>
    import("~/components/pokemon/PokemonList").then(
      (m) => m.PokemonList,
    ),
  {
    loading: () => (
      <div className="mt-4 text-sm text-slate-500">
        Cargando Pokédex...
      </div>
    ),
  },
);

export default function HomePage() {
  return (
    <main className="flex flex-col gap-4">
      <header className="mb-2">
        <h1 className="text-3xl font-semibold">
          Pokédex <span className="text-sky-600">Binpar</span>
        </h1>
        <p className="mt-1 max-w-xl text-xs text-slate-500">
          Listado completo desde PokéAPI con filtros, búsqueda en tiempo
          real (incluyendo evoluciones) y páginas de detalle.
        </p>
      </header>
      <PokemonList />
    </main>
  );
}
