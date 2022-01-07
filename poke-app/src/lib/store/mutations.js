export default {
  incrementPoints(state) {
    state.guesser.points++;
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
    console.log(state.guesser.gussed)
  },
  pushNewCard(state, newCard) {
    state.guesser.cards.push(newCard);
  },
};
