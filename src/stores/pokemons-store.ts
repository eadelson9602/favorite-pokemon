import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Pokemon } from '../models/Pokemon.models';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Pokemon[],
    pokemonSelected: {} as Pokemon,
  }),

  getters: {
    getPokemons: (state) => state.pokemons,
    getPokemonSelected: (state) => state.pokemonSelected,
  },

  actions: {
    setPokemons(pokemons: Pokemon[]) {
      this.pokemons = pokemons;
    },
    setFavoritePokemon(pokemon: Pokemon) {
      this.pokemons = this.pokemons.map((pokemonStore) => {
        if (pokemonStore.name === pokemon.name) {
          pokemonStore.isFavorite = !pokemonStore.isFavorite;
        }
        return pokemonStore;
      });
    },
    setPokemonSelected(pokemon: Pokemon) {
      this.pokemonSelected = pokemon;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemonStore, import.meta.hot));
}
