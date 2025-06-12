<template>
  <q-layout view="hHh lpR fFf" class="q-pt-lg">
    <q-toolbar>
      <div class="row full-width justify-center">
        <q-form @submit="searchPokemon" class="col-xs-12 col-sm-8 col-md-6">
          <q-input
            class="search-input"
            label-color="black"
            standout
            borderless
            v-model="search"
            label="Search pokemon"
            :rules="[(val) => !!val || 'Please enter a pokemon name']"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-form>
      </div>
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>

    <loading-component v-model="isLoading" />

    <q-footer class="bg-white text-white shadow-2 q-py-sm" v-if="route.path !== '/not_found'">
      <q-toolbar class="justify-center">
        <div class="col-xs-12 col-sm-8 col-md-6">
          <div class="row">
            <div class="col q-pr-sm">
              <q-btn
                class="full-width disable-btn"
                no-caps
                rounded
                unelevated
                icon="list"
                label="All"
                to="/home"
                :class="{ active: isActive('/home') }"
              />
            </div>
            <div class="col q-pl-sm">
              <q-btn
                class="full-width disable-btn"
                no-caps
                rounded
                unelevated
                icon="star"
                label="Favorites"
                to="/favorites"
                :class="{ active: isActive('/favorites') }"
              />
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { PokemonServiceImpl } from 'src/services/pokemon.service';

import { controlError } from 'src/helpers';
import { AxiosError } from 'axios';

import { LoadingComponent } from '../components';

import { usePokemonStore } from 'src/stores/pokemons-store';

const router = useRouter();
const route = useRoute();
const pokemonStore = usePokemonStore();

const isLoading = ref(false);
const search = ref('');

const isActive = (path: string) => {
  return route.path === path;
};

const pokemonService = new PokemonServiceImpl();
const searchPokemon = async () => {
  isLoading.value = true;
  try {
    const response = await pokemonService.getPokemonByName(search.value);
    const urlTemp = response.location_area_encounters.split('/');
    urlTemp.pop();

    const url = urlTemp.join('/');

    const pokemon = {
      ...response,
      url,
      isFavorite: false,
    };
    pokemonStore.setPokemons([pokemon]);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        await router.push('/not_found');
      } else {
        controlError(error);
      }
    } else {
      controlError(error);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
<style scoped>
.search-input {
  height: 50px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
}

.search-input :deep(.q-field__prepend) {
  padding: 0;
  margin: 0;
}

.search-input :deep(.q-field__control) {
  height: 50px;
  padding: 0 12px;
}

.search-input :deep(.q-field__native) {
  height: 50px;
  line-height: 50px;
}

.search-input :deep(.q-field__label) {
  font-size: 14px;
  color: #666;
}

.search-input :deep(.q-field__control-container) {
  padding-top: 0;
}

.disable-btn {
  background-color: #bfbfbf;
  color: white;
}

.disable-btn.active {
  background-color: #ff0000;
  color: white;
}
</style>
