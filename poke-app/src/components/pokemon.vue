<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


// Define a new global component called button-counter
export default {
  name :'pokemon-tag',
  data(){
  return{
    pokemon:[],
  }
},
  methods:{
  async catchAll(){
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const data = await fetch(url);
    const pokemon = await data.json();
    this.pokemon = pokemon.results;
  }
},
}
</script>

<template>
  <p class="text-center"> <button class="btn btn-danger mb-5 " @click="catchAll">Catch Pokemon</button></p>

  <div v-for="(item, index) in pokemon" :key="index">
    <div>
      <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`"
          alt=""
      />
      <h2>{{ item.name }}</h2>
    </div>
  </div>
</template>
