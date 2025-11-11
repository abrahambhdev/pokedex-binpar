"use client";

type Stat = { name: string; value: number };

export function PokemonStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="rounded-2xl bg-white/90 p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-600">
        Stats base
      </h2>
      <div className="mt-2 space-y-1.5">
        {stats.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-2 text-[10px]"
          >
            <span className="w-24 capitalize text-slate-600">
              {s.name}
            </span>
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-sky-500"
                style={{
                  width: `${Math.min(
                    100,
                    (s.value / 180) * 100,
                  ).toFixed(0)}%`,
                }}
              />
            </div>
            <span className="w-8 text-right text-slate-700">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
