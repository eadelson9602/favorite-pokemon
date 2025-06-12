import { usePokemonStore } from 'src/stores/pokemons-store';
import type { Pokemon } from 'src/models/Pokemon.models';
import { storeToRefs } from 'pinia';

export const usePokemon = () => {
  const pokemonStore = usePokemonStore();
  const { pokemons } = storeToRefs(pokemonStore);
  const { pokemonSelected } = storeToRefs(pokemonStore);

  const toggleFavorite = (pokemon: Pokemon) => {
    pokemonStore.setFavoritePokemon(pokemon);
  };

  const setPokemonSelected = (pokemon: Pokemon) => {
    pokemonStore.setPokemonSelected(pokemon);
  };

  return {
    toggleFavorite,
    pokemons,
    setPokemonSelected,
    pokemonSelected,
  };
};
