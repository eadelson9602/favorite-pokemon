<template>
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

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
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
</script>

<style scoped lang="scss">
.q-dialog {
  .q-card {
    background: white !important;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .q-card-actions {
    justify-content: center;
    padding: 0;
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
}
</style>
