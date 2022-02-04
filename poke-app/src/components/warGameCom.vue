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
      winner : "",
      remainingCards : false,
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
  },
  methods: {
    async getDeck() {
      const result = await fetch(this.apiGetDeck).then((r) => r.json());
      this.deckId = result.deck_id;
      //Ask players to enter their names
      const player1Name = prompt("Player 1 name : ");
      const player2Name = prompt("Player 2 name : ");
      //If players didnt enter their names , set name to player1 and player2
      if(player1Name === ""){
        this.player1Name = "Player 1"
      }else{
        this.player1Name = player1Name
      }
      if(player2Name === ""){
        this.player2Name = "Player 2"
      }else {
        this.player2Name = player2Name
      }
      if(player1Name == null || player2Name == null){
        return
      }
      else {
        this.gameOver = false
        this.remainingCards = false
      }
    },

    async drawCard() {
      const result = await fetch(this.apiGetCards).then((r) => r.json());
      //no. of remaining cards
      const remaining = result.remaining
      const cards = result
      this.cardOne = cards.cards[0]
      this.cardTwo = cards.cards[1]

      //Increment no. of rounds
      this.rounds++

      //Cards values
      const valueOne = parseInt(translateCards( this.cardOne.value))
      const valueTwo = parseInt(translateCards( this.cardTwo.value))

      if(valueOne > valueTwo) {
        //add one point to player1 score
        this.player1Points++
        this.$notify({
          text: this.player1Name,
          type: "success",
          // Time (in ms) to keep the notification on screen
          duration: 500,
          speed: 200
        });
      }

      if(valueOne < valueTwo) {
        //add one point to player2 score
        this.player2Points++
        this.$notify({
          text: this.player2Name,
          type: "danger",
          // Time (in ms) to keep the notification on screen
          duration: 500,
          speed: 200
        });
      };

      //check if there is no cards left
      if (remaining === 0){
          this.remainingCards = true
          if(this.player1Points > this.player2Points ) this.winner = this.player1Name
          if(this.player1Points < this.player2Points)  this.winner = this.player2Name
      }
    },

    //Start a new game
     newGame() {
       this.gameOver = true
       this.player1Points = 0;
       this.player2Points = 0;
       this.rounds = 0
       this.cardOne = {}
       this.cardTwo = {}
    },

    //Re-start game
    async restartGame() {
      this.remainingCards = false
      this.player1Points = 0;
      this.player2Points = 0;
      this.rounds = 0
      this.cardOne = {}
      this.cardTwo = {}
      const result = await fetch(this.apiGetDeck).then((r) => r.json());
      this.deckId = result.deck_id;

    },

    //Game description
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

      <h2 v-if="remainingCards" class=" text-2xl"> {{winner}} won 🤑 </h2>
      <div class="flex flex-row justify-center  mt-5 mb-3 md:w-3/5 md:flex-row md:justify-between ">
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

      <div class="mt-2 justify-content-center d-flex flex-row">
        <!--Disable drawing cards if there is no cards left-->
        <button  class="btn btn-secondary rounded-pill" @click="drawCard" :disabled="remainingCards" >Draw a card</button>
      </div>
      <div class="mt-3 justify-content-center d-flex flex-row mb-3">
        <button  class="btn bg-red-500 hover:bg-red-700 rounded-pill text-white	" @click="restartGame" >Re-start Game</button>
        <button  class="btn bg-red-500 hover:bg-red-700 rounded-pill text-white ml-3" @click=" newGame" >New Game</button>
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