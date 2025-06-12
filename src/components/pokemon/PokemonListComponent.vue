<template>
  <div class="pokemon-list">
    <q-list>
      <q-item
        @click="viewDetailPokemon(pokemon)"
        clickable
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        class="pokemon-card"
      >
        <q-item-section>
          <q-item-label>{{ pokemon.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="star" class="" unelevated size="sm" round />
        </q-item-section>
      </q-item>
    </q-list>

    <detail-pokemon-component v-model="viewDetail" :pokemon="pokemonData" v-if="pokemonData" />

    <loading-component v-model="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { Pokemon } from '../../models/Pokemon.models';
import type { PokemonService } from '../../services/pokemon.service';
import type { DetailPokemon } from '../../models/Pokemon.models';

import DetailPokemonComponent from './DetailPokemonComponent.vue';
import LoadingComponent from '../loading/LoadingComponent.vue';

import { controlError } from 'src/helpers';

interface PokemonListProps {
  pokemonService: PokemonService;
}

const props = defineProps<PokemonListProps>();
const pokemons = ref<Pokemon[]>([]);
const viewDetail = ref(false);
const pokemonData = ref<DetailPokemon>();
const loading = ref(true);

const viewDetailPokemon = async (pokemon: Pokemon) => {
  try {
    loading.value = true;
    const response = await props.pokemonService.getPokemonById(pokemon.url);
    pokemonData.value = response;
    setTimeout(() => {
      viewDetail.value = true;
    }, 2100);
  } catch (error) {
    controlError(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
};

onMounted(async () => {
  console.log('Setting loading to true');
  loading.value = true;
  try {
    const response = await props.pokemonService.fetchPokemons();
    pokemons.value = response.results;
  } catch (error) {
    controlError(error);
  } finally {
    console.log('Setting loading to false');
    loading.value = false;
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
