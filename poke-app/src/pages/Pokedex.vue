<script>
import Pokeman from '../components/pokemon.vue';

export default {
  components: {
    Pokeman,
  },

  data() {
    return {
      list: [],
    };
  },

  async mounted() {
    const localData = localStorage.getItem('pokemon');

    if (localData) {
      console.log('from storage');
      return (this.list = JSON.parse(localData));
    }

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

    const data = await fetch(url);
    const pokemon = await data.json();

    localStorage.setItem('pokemon', JSON.stringify(pokemon.results));

    console.log('from fetch');
    this.list = pokemon.results;
  },
};
</script>

<template>
  <h1 class="text-center fs-1 mt-3 mb-3">Pokedex</h1>

  <div class="flex flex-row flex-wrap justify-center align-items-center">
    <Pokeman
        v-for="(item, index) in list"
        :key="index"
        :name="item.name"
        :index="index"
        class="w-1/2 md:w-1/3"
    />
  </div>
</template>
