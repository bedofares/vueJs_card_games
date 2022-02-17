<template>
  <div class="text-center p-2">
    <div class="
  p-2
  bg-gray-200
  hover:bg-green-200
  rounded-md
  hover:shadow-xl
  transition-shadow
  duration-100
  ">
    <img :src="imgString" alt="" class="inline" />
    <h2 class="capitalize text-base md:text-2xl">{{ name }}</h2>
  </div>

  </div>
</template>

<script>
export default {
  name: 'Pokeman',

  props: {
    name: String,
    index: Number,
  },

  computed: {
    imgString() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          this.index + 1
      }.png`;
    },
  },
};
</script>

<style></style>