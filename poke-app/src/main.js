import { createApp } from 'vue'
//import App from './App.vue'
import { createRouter , createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Pokedex from './pages/Pokedex.vue'
import Calculator from './pages/calculator.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/pokedex', component: Pokedex },
    { path: '/calculator', component: Calculator }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = createApp({

})

// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.mount('#app')
