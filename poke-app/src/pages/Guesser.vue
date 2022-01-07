<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { mapState, mapActions, mapMutations } from 'vuex';

//import { createStore } from 'vuex';

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
  <h1 class="text-center">Guesser Game</h1>

  <section class="container text-center">
  <button @click="getDeck" class="btn rounded-pill btn-success">Get a new Deck</button>

  <div v-if="guesser.deckId">
    <div class="mt-3 justify-content-center d-flex flex-row">
    <button @click="setNextGuess('red')" class="btn btn-danger rounded-pill me-2">Guess Red</button>
    <br>
    <button @click="setNextGuess('black')" class="btn btn-dark rounded-pill me-2">Guess Black</button>
      <button v-if="guesser.nextGuess" class="btn btn-secondary rounded-pill" @click="drawCard" :disabled="!guesser.gussed">Draw a card</button>

    </div>
    <br>
    <div class="">
    <p class="fs-3 text-muted fw-bold">Guesses:{{guesser.guesses}}</p>
    <p class="fs-3 text-muted fw-bold">Points:{{guesser.points}}</p>
    </div>
    <p class="fs-4 text-muted">Your next guess:{{guesser.nextGuess}}</p>


    <div v-for="(card, index) in guesser.cards" :key="index">
      <span>{{ card.value }} of {{ card.symbol }}</span>
      <img :src="card.image" :alt="card.value">
    </div>
<!--    {{nextGuess}}-->
  </div>

  <div v-else>Please draw a new deck!</div>
  </section>
</template>


<style>
img{
  width: 100px;
}
</style>