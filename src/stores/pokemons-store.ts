import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Pokemon } from '../models/Pokemon.models';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Pokemon[],
  }),

  getters: {
    getPokemons: (state) => state.pokemons,
  },

  actions: {
    setPokemons(pokemons: Pokemon[]) {
      this.pokemons = pokemons;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemonStore, import.meta.hot));
}
