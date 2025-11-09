import "server-only";


import { URLBuilder } from "./urlBuilder";
import type { FetchLike, NamedAPIResource, PokeApi, PokeApiConfig, PokeApiEvolutionChain, PokeApiListResponse, PokeApiPokemon, PokeApiPokemonSpecies } from "~/types/pokeapi";
import type { PokemonHelper } from "~/helper/pokemon.helper";
import type { EvolutionEntry, PokeMeta, PokemonDetail, PokemonListItem } from "~/types/pokemon";

type CreatePokeApiDeps = PokeApiConfig & {
  fetchFn: FetchLike;
  helper: PokemonHelper;
};

export const createPokeApi = ({
  baseUrl,
  pokemonLimit,
  fetchFn,
  helper,
}: CreatePokeApiDeps): PokeApi => {
  const api = new URLBuilder(baseUrl);

  const fetchJson = async <T>(url: string): Promise<T> => {
    const res = await fetchFn(url);
    if (!res.ok) {
      throw new Error(`PokéAPI error ${res.status} for ${url}`);
    }
    const data = (await res.json()) as unknown;
    return data as T;
  };

  let pokemonIndexPromise: Promise<PokemonListItem[]> | null = null;

  const buildPokemonIndex = async (): Promise<PokemonListItem[]> => {
    const listUrl = api.withQuery(["pokemon"], {
      limit: pokemonLimit,
    });

    const list = await fetchJson<
      PokeApiListResponse<NamedAPIResource>
    >(listUrl);

    const speciesCache = new Map<string, PokeApiPokemonSpecies>();
    const chainCache = new Map<number, string[]>();

    const items: PokemonListItem[] = [];
    const concurrency = 20;

    for (let i = 0; i < list.results.length; i += concurrency) {
      const batch = list.results.slice(i, i + concurrency);

      const batchItems = await Promise.all(
        batch.map(async ({ name }) => {
          const pokemon = await fetchJson<PokeApiPokemon>(
            api.path("pokemon", name),
          );

          const id = pokemon.id;
          const types = pokemon.types.map((t) => t.type.name);
          const image = await helper.getOfficialArtwork(
            pokemon.sprites,
          );

          const speciesUrl = pokemon.species.url;
          let species = speciesCache.get(speciesUrl);
          if (!species) {
            species = await fetchJson<PokeApiPokemonSpecies>(
              speciesUrl,
            );
            speciesCache.set(speciesUrl, species);
          }

          const generation =
            species.generation?.name ?? "unknown";

          const evoUrl = species.evolution_chain?.url;
          const chainId =
            evoUrl != null
              ? await helper.getIdFromUrl(evoUrl)
              : 0;

          let evolutionNames: string[] | undefined;

          if (chainId > 0) {
            evolutionNames = chainCache.get(chainId);
            if (!evolutionNames) {
              const chain =
                await fetchJson<PokeApiEvolutionChain>(
                  api.path("evolution-chain", chainId),
                );
              evolutionNames =
                await helper.extractEvolutionNamesFromChain(
                  chain,
                );
              chainCache.set(chainId, evolutionNames);
            }
          }

          const item: PokemonListItem = {
            id,
            name: pokemon.name,
            image,
            types,
            generation,
            evolutionNames: evolutionNames ?? [],
          };

          return item;
        }),
      );

      items.push(...batchItems);
    }

    items.sort((a, b) => a.id - b.id);
    return items;
  };

  const getPokemonIndex = async (): Promise<PokemonListItem[]> => {
    if (!pokemonIndexPromise) {
      pokemonIndexPromise = buildPokemonIndex();
    }
    return pokemonIndexPromise;
  };

  const getPokemonDetail = async (
    nameOrId: string,
  ): Promise<PokemonDetail> => {
    const pokemon = await fetchJson<PokeApiPokemon>(
      api.path("pokemon", nameOrId),
    );

    const id = pokemon.id;
    const image = await helper.getOfficialArtwork(
      pokemon.sprites,
    );
    const types = pokemon.types.map((t) => t.type.name);
    const stats = await helper.mapStats(pokemon.stats);

    const species = await fetchJson<PokeApiPokemonSpecies>(
      pokemon.species.url,
    );
    const generation =
      species.generation?.name ?? "unknown";

    const evoUrl = species.evolution_chain?.url;
    const chainId =
      evoUrl != null
        ? await helper.getIdFromUrl(evoUrl)
        : 0;

    let evolutionChain: EvolutionEntry[] = [];

    if (chainId > 0) {
      const chain = await fetchJson<PokeApiEvolutionChain>(
        api.path("evolution-chain", chainId),
      );
      const evoNames =
        await helper.extractEvolutionNamesFromChain(chain);

      evolutionChain = await Promise.all(
        evoNames.map(async (evoName) => {
          const evo = await fetchJson<PokeApiPokemon>(
            api.path("pokemon", evoName),
          );
          return {
            id: evo.id,
            name: evo.name,
            image: await helper.getOfficialArtwork(
              evo.sprites,
            ),
          };
        }),
      );
    }

    return {
      id,
      name: pokemon.name,
      image,
      types,
      generation,
      stats,
      evolutionChain,
    };
  };

  const getMeta = async (): Promise<PokeMeta> => {
    const [typesRes, gensRes] = await Promise.all([
      fetchJson<PokeApiListResponse<NamedAPIResource>>(
        api.path("type"),
      ),
      fetchJson<PokeApiListResponse<NamedAPIResource>>(
        api.path("generation"),
      ),
    ]);

    return {
      types: typesRes.results
        .map((t) => t.name)
        .filter(
          (n) => n !== "unknown" && n !== "shadow",
        ),
      generations: gensRes.results.map((g) => g.name),
    };
  };

  return {
    getPokemonIndex,
    getPokemonDetail,
    getMeta,
  };
};
