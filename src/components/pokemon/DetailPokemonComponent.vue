<template>
  <q-dialog v-model="internalLoading" persistent>
    <q-card style="width: 350px; max-width: 80vw">
      <q-img
        :src="pokemon.sprites.front_default"
        spinner-color="primary"
        spinner-size="82px"
        no-native-menu
      >
        <div class="absolute-top-right" style="background: transparent">
          <q-btn
            icon="close"
            unelevated
            color="white"
            text-color="blue"
            round
            dense
            v-close-popup
          />
        </div>
      </q-img>

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">Name:</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ pokemon.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">Weight:</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ pokemon.weight }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">Height:</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ pokemon.height }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">Types:</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{
                pokemon.types.map((type) => type.type.name).join(', ')
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="between">
        <q-btn unelevated rounded color="negative" no-caps label="Share to my friends" />
        <q-btn
          unelevated
          round
          color="grey-2"
          :text-color="pokemonSelected.isFavorite ? 'yellow' : 'grey'"
          no-caps
          icon="star"
          @click="toggleFavorite(pokemonSelected)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { DetailPokemon } from '../../models/Pokemon.models';
import { usePokemon } from '../../composable/usePokemon';

const { toggleFavorite, pokemonSelected } = usePokemon();

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    pokemon: DetailPokemon;
  }>(),
  {
    modelValue: false,
  },
);

const emit = defineEmits(['update:modelValue']);

const internalLoading = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    internalLoading.value = val;
  },
);

watch(
  () => internalLoading.value,
  (val) => {
    emit('update:modelValue', val);
  },
);

onMounted(() => {});
</script>
<style lang="scss"></style>
