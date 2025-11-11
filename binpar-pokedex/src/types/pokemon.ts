export type PokemonStat = {
    name: string;
    value: number;
};

export type EvolutionEntry = {
    id: number;
    name: string;
    image: string;
};

export type PokemonListItem = {
  id: number;
  name: string;
  image: string;
  types: string[];
  generation: string;
  evolutionNames: string[];
};

export type PokemonDetail = {
  id: number;
  name: string;
  image: string;
  types: string[];
  generation: string;
  stats: PokemonStat[];
  evolutionChain: EvolutionEntry[];
};

export type PokeMeta = {
  types: string[];
  generations: string[];
};