<template>
  <pokemon-list-component :pokemonService="pokemonService" />
</template>
<script lang="ts" setup>
import { PokemonServiceImpl } from 'src/services/pokemon.service';
import { PokemonListComponent } from 'src/components';

const pokemonService = new PokemonServiceImpl();
</script>
<style lang="scss"></style>
