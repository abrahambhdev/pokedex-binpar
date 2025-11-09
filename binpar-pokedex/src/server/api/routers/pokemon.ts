import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import type { PokeApi } from "~/types/pokeapi";
import { pokeApi } from "~/server/di/pokeApi";

class PokemonRouter {
  constructor(private readonly pokeApi: PokeApi) {}


  meta = publicProcedure.query(() => {
    return this.pokeApi.getMeta();
  });

  // GET /pokemon/list
  list = publicProcedure
    .input(
      z
        .object({
          type: z.string().optional(),
          generation: z.string().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const { type, generation, search } = input ?? {};
      const q = search?.trim().toLowerCase() ?? "";

      const index = await this.pokeApi.getPokemonIndex();

      return index.filter((p) => {
        if (type && !p.types.includes(type)) return false;
        if (generation && p.generation !== generation) return false;

        if (q) {
          const inName = p.name.toLowerCase().includes(q);
          const inEvos = p.evolutionNames.some((n) =>
            n.toLowerCase().includes(q),
          );
          if (!inName && !inEvos) return false;
        }

        return true;
      });
    });

  detail = publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => {
      const normalized = input.name.toLowerCase();
      return this.pokeApi.getPokemonDetail(normalized);
    });
}

const pokemonRouterClass = new PokemonRouter(pokeApi);

export const pokemonRouter = createTRPCRouter({
  meta: pokemonRouterClass.meta,
  list: pokemonRouterClass.list,
  detail: pokemonRouterClass.detail,
});
