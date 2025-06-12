<template>
  <q-page padding>
    <q-input v-model="search" label="Search pokemon">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <ErrorNotFound />
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ErrorNotFound from './ErrorNotFound.vue';

const search = ref('');
</script>
<style lang=""></style>
