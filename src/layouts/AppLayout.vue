<template>
  <q-layout view="hHh lpR fFf" class="q-pt-lg">
    <q-toolbar>
      <div class="row full-width justify-center">
        <div class="col-xs-12 col-md-6">
          <q-input
            class="search-input"
            label-color="black"
            standout
            borderless
            v-model="search"
            label="Search pokemon"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-white shadow-2 q-py-sm">
      <q-toolbar class="justify-center">
        <div class="col-xs-12 col-md-6">
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
import { useRoute } from 'vue-router';

const search = ref('');
const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
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
