import type { PokemonListItem, PokemonDetail, PokeMeta } from "./pokemon";

export type FetchLike = (url: string) => Promise<Response>;

export type PokeApiConfig = {
  baseUrl: string;
  pokemonLimit: number;
};

export type PokeApi = {
  getPokemonIndex: () => Promise<PokemonListItem[]>;
  getPokemonDetail: (nameOrId: string) => Promise<PokemonDetail>;
  getMeta: () => Promise<PokeMeta>;
};

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type PokeApiListResponse<T> = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
};

export type PokeApiPokemonSprites = {
  front_default?: string | null;
  other?: {
    ["official-artwork"]?: {
      front_default?: string | null;
    };
  };
};

export type PokeApiPokemonTypeEntry = {
  slot?: number;
  type: NamedAPIResource;
};

export type PokeApiPokemonStatEntry = {
  base_stat: number;
  stat: NamedAPIResource;
};

export type PokeApiPokemon = {
  id: number;
  name: string;
  sprites: PokeApiPokemonSprites;
  types: PokeApiPokemonTypeEntry[];
  stats: PokeApiPokemonStatEntry[];
  species: NamedAPIResource;
};

export type PokeApiPokemonSpecies = {
  generation?: {
    name: string;
  };
  evolution_chain?: {
    url: string;
  };
};

export type PokeApiChainLink = {
  species?: {
    name?: string;
  };
  evolves_to?: PokeApiChainLink[];
};

export type PokeApiEvolutionChain = {
  chain: PokeApiChainLink;
};
