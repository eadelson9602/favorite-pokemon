<template>
  <div class="pokemon-list">
    <q-list>
      <q-item clickable v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-card">
        <q-item-section>
          <q-item-label>{{ pokemon.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="star" class="" unelevated size="sm" round @click="toggleFavorite(pokemon)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { Pokemon } from '../models/Pokemon.models';
import type { PokemonService } from '../services/pokemon.service';

import { controlError } from 'src/helpers';

interface PokemonListProps {
  pokemonService: PokemonService;
}

const props = defineProps<PokemonListProps>();
const pokemons = ref<Pokemon[]>([]);

const toggleFavorite = (pokemon: Pokemon) => {
  // Implement favorite logic here
  console.log(`Toggled favorite for ${pokemon.name}`);
};

onMounted(async () => {
  try {
    const response = await props.pokemonService.fetchPokemons();
    pokemons.value = response.results;
  } catch (error) {
    controlError(error);
  }
});
</script>

<style scoped>
.pokemon-list {
  width: 100%;
  margin: 0 auto;
}

.pokemon-card {
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.pokemon-card:hover {
  transform: translateY(-2px);
}

.pokemon-card .q-btn {
  background: #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #bfbfbf;
}

.pokemon-card .q-btn:hover {
  background: #e0e0e0;
  transform: scale(1.1);
}
</style>
