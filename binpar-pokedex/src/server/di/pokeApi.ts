import { env } from "process";
import "server-only";
import { PokemonHelper } from "~/helper/pokemon.helper";
import { createPokeApi } from "~/lib/pokeApi";



const helper = new PokemonHelper();

export const pokeApi = createPokeApi({
  baseUrl: (env.POKEAPI_ROOT || "").trim(),
  pokemonLimit: Number(env.POKEAPI_POKEMON_POKEMON_LIMIT ?? env.POKEAPI_POKEMON_LIMIT), 
  fetchFn: (url: string) => fetch(url),
  helper,
});
