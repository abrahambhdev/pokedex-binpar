
import type { PokeApiChainLink, PokeApiEvolutionChain, PokeApiPokemonSprites, PokeApiPokemonStatEntry } from "~/types/pokeapi";
import type { PokemonStat } from "~/types/pokemon";

export class PokemonHelper {
  getIdFromUrl = async (url: string): Promise<number> => {
    const parts = url.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    const parsed = Number(last);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  extractEvolutionNamesFromChain = async (
    chain: PokeApiEvolutionChain | PokeApiChainLink,
  ): Promise<string[]> => {
    const root: PokeApiChainLink =
      "chain" in chain ? chain.chain : chain;

    const names: string[] = [];

    const walk = (node: PokeApiChainLink | undefined): void => {
      if (!node) return;
      const speciesName = node.species?.name;
      if (speciesName) {
        names.push(String(speciesName));
      }
      node.evolves_to?.forEach((child) => walk(child));
    };

    walk(root);

    return Array.from(new Set(names));
  };

  getOfficialArtwork = async (
    sprites?: PokeApiPokemonSprites | null,
  ): Promise<string> => {
    if (!sprites) return "";
    const official =
      sprites.other?.["official-artwork"]?.front_default;
    if (official) return official;
    return sprites.front_default ?? "";
  };

  mapStats = async (
    rawStats?: PokeApiPokemonStatEntry[] | null,
  ): Promise<PokemonStat[]> => {
    if (!rawStats) return [];
    return rawStats.map((s) => ({
      name: String(s.stat?.name ?? ""),
      value: Number(s.base_stat ?? 0),
    }));
  };
}
