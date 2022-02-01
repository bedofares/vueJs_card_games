<script>
import { mapState, mapActions, mapMutations } from 'vuex';


export default {
  computed: {
    ...mapState(['guesser']),
  },

  methods: {
    ...mapActions(['getDeck', 'setNextGuess', 'drawCard']),
  },
};
</script>

<template>
  <h1 class="text-center fs-1 mt-3 mb-3" >Guesser Game</h1>

  <section class="container text-center">
  <button @click="getDeck" class="btn rounded-pill btn-success mt-3">Get a new Deck</button>

  <div v-if="guesser.deckId">
    <div class="mt-3 justify-content-center d-flex flex-row">
    <button @click="setNextGuess('red')" class="btn btn-danger rounded-pill me-2">Guess Red</button>
    <br>
    <button @click="setNextGuess('black')" class="btn btn-dark rounded-pill me-2">Guess Black</button>
      <button v-if="guesser.nextGuess" class="btn btn-secondary rounded-pill" @click="drawCard" :disabled="!guesser.gussed">Draw a card</button>

    </div>

    <br>
    <div class="flex justify-center flex-row">
    <p class="fs-3 text-muted fw-bold">Guesses: {{guesser.guesses}}</p>
    <p class="fs-3 ml-5 text-muted fw-bold">Points: {{guesser.points}}</p>
    </div>
    <p class="fs-5 text-muted mb-3">Your next guess : {{guesser.nextGuess}}</p>


    <div v-for="(card, index) in guesser.cards" :key="index" class="mb-3">
      <span class="fs-3">{{ card.value }} of {{ card.symbol }}</span>
      <img :src="card.image" :alt="card.value" class="imgbtn mx-auto d-block mt-2">
    </div>
<!--    {{nextGuess}}-->
  </div>

  <div class="mt-2" v-else>Please draw a new deck!</div>
  </section>
</template>


<style>
.imgbtn{
  width: 150px;
}
</style>