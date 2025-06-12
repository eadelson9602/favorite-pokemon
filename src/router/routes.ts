import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/home',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/HomePage.vue') }],
  },
  {
    path: '/favorites',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/FavoritesPokemons.vue') }],
  },
  {
    path: '/not_found',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/ErrorNotFound.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
