export default {
  incrementPoints(state) {
    state.guesser.points++;
    //console.log(state.guesser)
  },
  incrementGuesses(state) {
    state.guesser.guesses++;
  },
  setDeckId(state, deckId) {
    state.guesser.deckId = deckId;
  },
  setNextGuess(state, color) {
    state.guesser.nextGuess = color;
    state.guesser.gussed = true;
    //console.log(state.guesser.gussed)
  },
  pushNewCard(state, newCard) {
    state.guesser.cards.pop();
    state.guesser.cards.push(newCard);
    //console.log(state.guesser.cards)
  },

};
