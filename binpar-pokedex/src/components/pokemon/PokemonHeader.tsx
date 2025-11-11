type PokemonHeaderProps = {
  pokemon: {
    id: number;
    name: string;
    image: string;
    generation: string;
    types: string[];
  };
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-white/90 p-5 shadow-sm md:flex-row">
      <div className="flex flex-col items-center gap-2 md:w-1/3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="h-40 w-40 object-contain"
        />
        <span className="text-[10px] text-slate-500">
          #{pokemon.id.toString().padStart(4, "0")}
        </span>
        <h1 className="text-3xl font-semibold capitalize">
          {pokemon.name}
        </h1>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] capitalize text-slate-700">
          {pokemon.generation.replace("generation-", "Generación ")}
        </span>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
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
    </section>
  );
}
