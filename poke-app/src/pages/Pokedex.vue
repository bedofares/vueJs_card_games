<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Pokemon from '../components/pokemon.vue'

// Define a new global component called button-counter
export default {
  name :'PokedexPage',
  components:{
   Pokemon,
  }
}
</script>

<template>
  <h1 class="text-muted text-center">Pokedex Page</h1>
  <Pokemon></Pokemon>
<!-- {{pokemon}}-->
</template>