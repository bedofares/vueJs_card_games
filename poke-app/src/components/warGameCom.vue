<script>
const API = 'https://deckofcardsapi.com/api/deck';

function translateCards(value){
  switch (value){
    case "JACK":
      value = "11";
      break;
    case "QUEEN":
      value = "12";
      break;
    case "KING":
      value = "13";
      break;
    case "ACE":
      value = "14";
      break;

    default:
      break;
  }
  return value
}
export default {
  name: "WarGame",
  data() {
    return {
      gameOver : true,
      deckId: undefined,
      cardOne : {},
      cardTwo : {},
      player1Name : "",
      player2Name : "",
      player1Points : 0,
      player2Points : 0,
      rounds : 0
    };
  },
  computed: {
    apiGetDeck() {
      return `${API}/new/shuffle/?deck_count=1`;
    },

    apiGetCards() {
      return `${API}/${this.deckId}/draw/?count=2`;
    },
    deckAvailable() {
      return this.deckId !== undefined;
    },
  },
  methods: {
    async getDeck() {
      const result = await fetch(this.apiGetDeck).then((r) => r.json());
      this.deckId = result.deck_id;
      const player1Name = prompt("Player 1 name : ");
      const player2Name = prompt("Player 2 name : ");
      if(player1Name == ""){
        this.player1Name = "Player 1"
      }else{
        this.player1Name = player1Name
      }
      if(player2Name == ""){
        this.player2Name = "Player 2"
      }else {
        this.player2Name = player2Name
      }

      if(player1Name == null || player2Name == null){
        return
      }
      else {
        this.gameOver = false
      }
      //console.log(result)
    },
    async drawCard() {
      const result = await fetch(this.apiGetCards).then((r) => r.json());
      const remaining = result.remaining
      const cards = result
      this.cardOne = cards.cards[0]
      this.cardTwo = cards.cards[1]
      this.rounds++

      const valueOne = parseInt(translateCards( this.cardOne.value))
      const valueTwo = parseInt(translateCards( this.cardTwo.value))
      // console.log(valueOne , valueTwo)
      //console.log(remaining)

      if(valueOne > valueTwo) {this.player1Points++
        this.$notify({
          text: this.player1Name,
          type: "success",

          // (optional, override)
          // Time (in ms) to keep the notification on screen
          duration: 500,
          speed: 200
        });
      };
      if(valueOne < valueTwo) {this.player2Points++
        this.$notify({
          text: this.player2Name,
          type: "danger",

          // (optional, override)
          // Time (in ms) to keep the notification on screen
          duration: 500,
          speed: 200
        });
      };

      if (remaining === 0){
        this.gameOver = true
        if(this.player1Points > this.player2Points )alert(this.player1Name + " Won");
        if(this.player1Points < this.player2Points) alert(this.player2Name +  " Won");
        this.player1Points = 0;
        this.player2Points = 0;
        this.rounds = 0
        this.cardOne = {}
        this.cardTwo = {}
      }

    },

    async restartGame() {
      this.player1Points = 0;
      this.player2Points = 0;
      this.rounds = 0
      this.cardOne = {}
      this.cardTwo = {}
      const result = await fetch(this.apiGetDeck).then((r) => r.json());
      this.deckId = result.deck_id;

    },

    howToPlay(){
      this.$swal({
        title: "How to play?",
        text: "Each player will get 26 cards and for each round the player with the higher card value will gain a point until all rounds are finished \n" +
            "and the player with highest points is the winner",
        confirmButtonColor: "#a4a4a4",
      })

    }
  },
};

</script>
<template>
  <h1 class="text-center fs-1 mt-3 mb-3">♠♠ War Card Game ♠♠</h1>
  <section class="container text-center">
    <notifications position="center center" />

    <div v-if="gameOver">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center " @click="howToPlay"  >How to play ? </button>
      <br><button  @click="getDeck" class="btn rounded-pill btn-success mt-3">START GAME</button>
    </div>

    <div class="flex flex-col align-items-center" v-if="!gameOver" >

      <div class="flex flex-row justify-center  mt-16 mb-3 md:w-3/5 md:flex-row md:justify-between ">
        <div  class="flex flex-col align-items-center">
          <p class="text-lg  text-green-500 fw-bold md:text-2xl ">{{ player1Name }} <br> <span class="text-lg text-black fw-normal	"> Score : {{player1Points}}</span></p>
          <img :src="cardOne?.image" :alt="cardOne?.value" class="imgbtn1 mt-3">
        </div>
        <div class="pr-2 pl-2">
          <p class="text-md"> Round : <span>{{rounds}}</span></p>
        </div>

        <div class="flex flex-col align-items-center ">
          <p class="text-lg  text-blue-500 fw-bold md:text-2xl">{{ player2Name }} <br> <span class="text-lg text-black fw-normal"> Score : {{player2Points}}</span></p>
          <img :src="cardTwo?.image" :alt="cardTwo?.value" class="imgbtn1 mt-3 ">
        </div>
      </div>

      <div class="mt-3 justify-content-center d-flex flex-row">
        <button  class="btn btn-secondary rounded-pill" @click="drawCard" >Draw a card</button>
      </div>

      <div class="mt-3 justify-content-center d-flex flex-row mb-5">
        <button  class="btn bg-red-500 hover:bg-red-700 rounded-pill text-white	" @click="restartGame" >Re-start Game</button>
      </div>
    </div>

    <div class="mt-2"></div>
  </section>
</template>


<style>
.imgbtn1{
  width: 180px;
}
</style>