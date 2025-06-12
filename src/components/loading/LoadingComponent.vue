<!-- src/components/LoadingComponent.vue -->
<template>
  <!-- Se abrirá mientras internalLoading sea true -->
  <q-dialog v-model="internalLoading" persistent maximized>
    <q-card style="background: white !important">
      <q-card-actions class="row items-center justify-evenly q-pa-lg full-height">
        <q-img
          src="/img/pokebola.png"
          class="pokeball"
          spinner-color="primary"
          spinner-size="82px"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

/* 1️⃣  La prop se llama modelValue (clave por defecto de v‑model) */
const props = withDefaults(
  defineProps<{
    modelValue?: boolean; // opcional → evita errores de tipado
  }>(),
  { modelValue: false },
);

/* 2️⃣  Emitiremos update:modelValue */
const emit = defineEmits(['update:modelValue']);

/* 3️⃣  Estado interno sincronizado */
const internalLoading = ref(props.modelValue);

/* Sincroniza cuando cambia la prop desde fuera */
watch(
  () => props.modelValue,
  (val) => (internalLoading.value = val),
);

/* Propaga hacia arriba cuando cambia desde dentro */
watch(
  () => internalLoading.value,
  (val) => emit('update:modelValue', val),
);

/* 4️⃣  Auto‑ocultar tras 5s si arranca activo          */
if (props.modelValue) {
  setTimeout(() => (internalLoading.value = false), 5000);
}
</script>

<style scoped lang="scss">
.q-dialog .q-card {
  background: white !important;
  border-radius: 16px;
  padding: 20px;
}
.pokeball {
  width: 100px;
  height: 100px;
  animation: heartbeat 1s infinite;
}
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
