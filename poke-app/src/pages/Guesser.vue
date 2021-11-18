<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

//import { createStore } from 'vuex';

const API = "https://deckofcardsapi.com/api/deck/new/shuffle/"

 // Cardsymbol switch
function cardSymbol(card) {
  switch (card.suit) {
    case 'CLUBS':
      return '♣️';
    case 'SPADES':
      return '♠️';
    case 'DIAMONDS':
      return '♦️';
    case 'HEARTS':
      return '♥️';
    default:
      break;
  }
}

function validateGuess(card , nextGuess){
  const colors = {
    'SPADES': 'black',
    'HEARTS': 'red',
    'CLUBS': 'black',
    'DIAMONDS': 'red',
  }

  const cardColor = colors[card.suit];
  return cardColor == nextGuess;
}

export default {
  data(){
    return{
      deckId: undefined,
      cards: [],
      nextGuess: undefined,
      guesses: 0,
      points:0,
      gussed:false,
    }
  },
  computed:{
    cardAPI(){
      return `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`
    },
  },
  methods:{
    async getDeck(){
      const {deck_id} = await fetch(API).then((r)=> r.json());
      this.deckId = deck_id
    },

    guessCard(color){
      this.nextGuess = color;
      this.gussed = true
      console.log(this.gussed)
    },

    async drawCard(){
      const { cards } = await fetch(this.cardAPI).then(r=> r.json());

      //+1 the guess counter
      this.guesses++

      //+1 the point counter if you guessed correctly
      if(validateGuess(cards[0],this.nextGuess)){
        this.points++
      }
      this.cards.push(cards[0])

      this.gussed = false;
      console.log(this.gussed)
      // const cleanCard = {
      //   value: cards[0].value,
      //   symbol: cardSymbol(cards[0]),
      //   image: cards[0].image
      // }
    },
  },
}
</script>

<template>
  <h1 class="text-center">Guesser Game</h1>

  <section class="container text-center">
  <button @click="getDeck" class="btn rounded-pill btn-success">Get a new Deck</button>

  <div v-if="deckId">
    <div class="mt-3 justify-content-center d-flex flex-row">
    <button @click="guessCard('red')" class="btn btn-danger rounded-pill me-2">Guess Red</button>
    <br>
    <button @click="guessCard('black')" class="btn btn-dark rounded-pill me-2">Guess Black</button>
      <button @click="drawCard" class="btn btn-secondary rounded-pill" :disabled="!gussed" >Draw a card</button>

    </div>
    <br>
    <div class="">
    <p class="fs-3 text-muted fw-bold">Guesses:{{guesses}}</p>
    <p class="fs-3 text-muted fw-bold">Points:{{points}}</p>
    </div>
    <p class="fs-4 text-muted">Your next guess:{{nextGuess}}</p>


    <div v-for="card in cards">
      <span>{{ card.value }} of {{ card.suit }}</span>
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