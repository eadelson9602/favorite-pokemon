<template>
  <div class="pokemon-list">
    <q-list>
      <q-item v-for="pokemon in pokemons" :key="pokemon.name">
        <q-item-section>
          <q-item-label>{{ pokemon.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Pokemon } from '../models/Pokemon.models';
import type { PokemonService } from '../services/pokemon.service';

interface PokemonListProps {
  pokemonService: PokemonService;
}

const props = defineProps<PokemonListProps>();
const pokemons = ref<Pokemon[]>([]);

onMounted(async () => {
  try {
    const response = await props.pokemonService.fetchPokemons();
    pokemons.value = response.results;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
});
</script>

<style scoped>
.pokemon-list {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
