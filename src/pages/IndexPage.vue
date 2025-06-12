<template>
  <q-page class="row items-center justify-evenly q-pa-lg">
    <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 column items-center justify-evenly">
      <q-avatar size="250px">
        <q-img src="/img/img-welcome.png" spinner-color="primary" spinner-size="82px" />
      </q-avatar>
      <h1 class="text-center title">Welcome to Pokédex</h1>
      <p class="text-body1 text-center">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>
      <q-btn color="negative" label="Get started" unelevated rounded to="/home" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>
