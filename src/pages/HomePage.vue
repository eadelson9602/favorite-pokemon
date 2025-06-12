<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-6">
        <PokemonListComponent :pokemonService="pokemonService" />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { PokemonListComponent } from 'src/components';
import { PokemonServiceImpl } from 'src/services/pokemon.service';

const pokemonService = new PokemonServiceImpl();
</script>
<style scoped></style>
