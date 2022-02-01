import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import Pokedex from '@/pages/Pokedex.vue';
import Guesser from '@/pages/Guesser.vue';
import Calculator from '@/pages/calculator.vue';
import WarGame from '@/pages/WarGame.vue' ;


const routes = [
  { path: '/', component: Home },
  { path: '/pokedex', component: Pokedex },
  { path: '/guesser', component: Guesser },
  { path: '/calculator', component: Calculator },
  { path: '/war', component: WarGame }
];

// Here we create our own Vue Router Instance
// and define the paths we can then use.
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
