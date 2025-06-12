<template>
  <div class="pokemon-list">
    <q-list>
      <q-item
        @click="viewDetailPokemon(pokemon)"
        clickable
        v-for="pokemon in pokemonsList"
        :key="pokemon.name"
        class="pokemon-card cursor-pointer"
      >
        <q-item-section>
          <q-item-label>{{ pokemon.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            icon="star"
            class="star-btn"
            @click.stop="toggleFavorite(pokemon)"
            unelevated
            size="sm"
            round
            :text-color="pokemon.isFavorite ? 'yellow' : 'grey'"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <detail-pokemon-component v-model="viewDetail" :pokemon="pokemonData" v-if="pokemonData" />

    <loading-component v-model="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import type { Pokemon } from '../../models/Pokemon.models';
import type { PokemonService } from '../../services/pokemon.service';
import type { DetailPokemon } from '../../models/Pokemon.models';

import DetailPokemonComponent from './DetailPokemonComponent.vue';
import LoadingComponent from '../loading/LoadingComponent.vue';

import { controlError } from 'src/helpers';
import { usePokemon } from 'src/composable/usePokemon';

import { usePokemonStore } from 'src/stores/pokemons-store';

interface PokemonListProps {
  pokemonService: PokemonService;
}

const route = useRoute();

const pokemonStore = usePokemonStore();
const { toggleFavorite, setPokemonSelected } = usePokemon();

const props = defineProps<PokemonListProps>();
const { pokemons } = storeToRefs(pokemonStore);
const viewDetail = ref(false);
const pokemonData = ref<DetailPokemon>();
const loading = ref(true);
const pokemonsList = ref<Pokemon[]>([]);

const viewDetailPokemon = async (pokemon: Pokemon) => {
  loading.value = true;
  try {
    setPokemonSelected(pokemon);

    const response = await props.pokemonService.getPokemonByUrl(pokemon.url);
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
  loading.value = true;
  try {
    console.log('route.name', route.path);
    if (route.path === '/favorites') {
      pokemonsList.value = pokemons.value.filter((pokemon) => pokemon.isFavorite);
    } else {
      if (pokemons.value.length === 0) {
        const response = await props.pokemonService.fetchPokemons();
        pokemonStore.setPokemons(
          response.results.map((pokemon) => ({ ...pokemon, isFavorite: false })),
        );
      }
      pokemonsList.value = pokemons.value;
    }
  } catch (error) {
    controlError(error);
  } finally {
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
