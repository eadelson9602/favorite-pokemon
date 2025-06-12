import { api } from '../boot/axios';
import type { DetailPokemon, ResponsePokemon } from '../models/Pokemon.models';

export interface PokemonService {
  fetchPokemons(): Promise<ResponsePokemon>;
  getPokemonByUrl(url: string): Promise<DetailPokemon>;
  getPokemonByName(name: string): Promise<DetailPokemon>;
}

export class PokemonServiceImpl implements PokemonService {
  async fetchPokemons(): Promise<ResponsePokemon> {
    const response = await api.get('/pokemon');
    const data = await response.data;
    return data;
  }

  async getPokemonByUrl(url: string): Promise<DetailPokemon> {
    const response = await api.get(url);
    const data = await response.data;
    return data;
  }

  async getPokemonByName(name: string): Promise<DetailPokemon> {
    const response = await api.get(`/pokemon/${name}`);
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
        { name: 'bulbasaur', url: `https://pokeapi.co/api/v2/pokemon/1/`, isFavorite: false },
        { name: 'ivysaur', url: `https://pokeapi.co/api/v2/pokemon/2/`, isFavorite: false },
      ],
    });
  }

  getPokemonByUrl(url: string): Promise<DetailPokemon> {
    const id = url.split('/').filter(Boolean).pop();
    return Promise.resolve({
      abilities: [
        {
          ability: { name: 'ability', url: '' },
          is_hidden: false,
          slot: 1,
        },
      ],
      base_experience: 100,
      cries: {
        latest: 'https://raw.githubusercontent.com/PokeAPI/sounds/master/cries/latest/1.mp3',
        legacy: 'https://raw.githubusercontent.com/PokeAPI/sounds/master/cries/legacy/1.mp3',
      },
      forms: [
        {
          name: 'base-form',
          url: '',
        },
      ],
      game_indices: [],
      height: 10,
      held_items: [],
      id: parseInt(id || '1'),
      is_default: true,
      location_area_encounters: '',
      moves: [],
      name: `pokemon-${id}`,
      order: 1,
      past_abilities: [],
      past_types: [],
      species: {
        name: 'species',
        url: '',
      },
      sprites: {
        back_default: '',
        back_female: null,
        back_shiny: '',
        back_shiny_female: null,
        front_default: '',
        front_female: null,
        front_shiny: '',
        front_shiny_female: null,
      },
      stats: [],
      types: [
        {
          slot: 1,
          type: {
            name: 'normal',
            url: '',
          },
        },
      ],
      weight: 20,
    });
  }

  getPokemonByName(name: string): Promise<DetailPokemon> {
    const id = name.split('/').filter(Boolean).pop();
    return Promise.resolve({
      abilities: [
        {
          ability: { name: 'ability', url: '' },
          is_hidden: false,
          slot: 1,
        },
      ],
      base_experience: 100,
      cries: {
        latest: 'https://raw.githubusercontent.com/PokeAPI/sounds/master/cries/latest/1.mp3',
        legacy: 'https://raw.githubusercontent.com/PokeAPI/sounds/master/cries/legacy/1.mp3',
      },
      forms: [
        {
          name: 'base-form',
          url: '',
        },
      ],
      game_indices: [],
      height: 10,
      held_items: [],
      id: parseInt(id || '1'),
      is_default: true,
      location_area_encounters: '',
      moves: [],
      name: `pokemon-${id}`,
      order: 1,
      past_abilities: [],
      past_types: [],
      species: {
        name: 'species',
        url: '',
      },
      sprites: {
        back_default: '',
        back_female: null,
        back_shiny: '',
        back_shiny_female: null,
        front_default: '',
        front_female: null,
        front_shiny: '',
        front_shiny_female: null,
      },
      stats: [],
      types: [
        {
          slot: 1,
          type: {
            name: 'normal',
            url: '',
          },
        },
      ],
      weight: 20,
    });
  }
}
