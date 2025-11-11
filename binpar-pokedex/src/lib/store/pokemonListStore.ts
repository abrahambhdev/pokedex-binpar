// src/lib/store/pokemonListStore.ts
import { create } from "zustand";

type State = {
  search: string;
  type?: string;
  generation?: string;
  scrollY: number;
};

type Actions = {
  setSearch: (v: string) => void;
  setType: (t?: string) => void;
  setGeneration: (g?: string) => void;
  setScrollY: (y: number) => void;
};

export const usePokemonListStore = create<State & Actions>((set) => ({
  search: "",
  type: undefined,
  generation: undefined,
  scrollY: 0,
  setSearch: (search) => set({ search }),
  setType: (type) => set({ type: type || undefined }),
  setGeneration: (generation) =>
    set({ generation: generation || undefined }),
  setScrollY: (scrollY) => set({ scrollY }),
}));
