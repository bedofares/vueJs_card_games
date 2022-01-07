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
  async mounted(){
    const localData = localStorage.getItem('pokemon')
    if(localData){
      console.log("from storage")
      return this.pokemon = JSON.parse(localData)
      //this.list = localData
    }
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const data = await fetch(url);
    const pokemon = await data.json();
    localStorage.setItem('pokemon',JSON.stringify(pokemon.results))

    console.log('from fetch')
    this.pokemon = pokemon.results;
  },


//   methods:{
//   async catchAll(){
//     const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
//     const data = await fetch(url);
//     const pokemon = await data.json();
//     this.pokemon = pokemon.results;
//   }
// },
}
</script>

<template>
  <p class="text-center"> <button class="btn btn-danger mb-5 " @click="catchAll">Catch Pokemon</button></p>

  <div class="container border-1">
  <div class="d-flex flex-wrap justify-content-center align-items-center border-1">
  <div class="col-4 border-1 justify-content-center align-items-center text-center" v-for="(item, index) in pokemon" :key="index">
    <div>
      <img class="inline border-1"
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`"
          alt=""
      />
      <h2 class="uppercase fw-bold">{{ item.name }}</h2>
    </div>
  </div>
  </div>
  </div>
</template>
