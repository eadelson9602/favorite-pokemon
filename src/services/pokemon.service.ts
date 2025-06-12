import { api } from '../boot/axios';
import type { Pokemon, ResponsePokemon } from '../models/Pokemon.models';

export interface PokemonService {
  fetchPokemons(): Promise<ResponsePokemon>;
  getPokemonById(id: number): Promise<Pokemon>;
}

export class PokemonServiceImpl implements PokemonService {
  async fetchPokemons(): Promise<ResponsePokemon> {
    const response = await api.get('/pokemon');
    const data = await response.data;
    return data;
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const response = await api.get(`/pokemon/${id}`);
    const data = await response.data;
    return data;
  }
}

export class PokemonServiceMock implements PokemonService {
  fetchPokemons(): Promise<ResponsePokemon> {
    return Promise.resolve({
      count: 100,
      next: '',
      previous: '',
      results: [
        { name: 'bulbasaur', url: `https://pokeapi.co/api/v2/pokemon/1/` },
        { name: 'ivysaur', url: `https://pokeapi.co/api/v2/pokemon/2/` },
      ],
    });
  }

  getPokemonById(id: number): Promise<Pokemon> {
    return Promise.resolve({
      name: `pokemon-${id}`,
      url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    });
  }
}
