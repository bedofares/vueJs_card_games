import axios from 'axios';

const state = {
    game: false,
    round: 0,
    turn: null,
    winner: null,
    finished: false,

    players: [
        {
            name: "player",
            score: 0,
            hand: [],
        },
        {
            name: "AI",
            score: 0,
            hand: [],
        },
    ],

    deck: {
        deck_id: null,
        shuffled: null,
        remaining: null,
    },

    pile: [
        {card:null},
        {card: null}
    ],
};

const getters = {
    gameState: (state) => {
        return  {
            gameStatus: state.game,
            turn: state.turn,
            round: state.round,
            finished: state.finished
        };
    },
    players: (state) => state.players,
    playerHand: (state) => (id) =>  state.players[parseInt(id)].hand,
    playerHandLength: (state) => (id) => state.players[parseInt(id)].hand.length,
    deck: (state) => state.deck,
    pile: (state) => state.pile,
    gameOver: (state) => state.finished,
    winner: (state) => state.winner,
};

const actions = {
    async fetchDeck({ commit }) {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        commit('setDeck', response.data);
    },
    async fetchHand({ commit, state, dispatch }, userId) {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/' + state.deck.deck_id + '/draw/?count=26');
        commit('setHand', {
            'playerID': userId,
            'cards': response.data.cards
        });
        dispatch('updateCardsAmount', response.data.remaining);
    },

    updateCardsAmount({ commit }, amount) {
        commit('updateCardsAmount', amount);
    },

    incrementRound({ commit }) {
        commit('incrementRound');
    },

    randomStart({ commit }) {
        let random = Math.round(Math.random());
        commit('setTurn', random);
    },

    throwCard({ commit,state }, userId) {
        state.pile[userId].card = state.players[userId].hand[0];
        commit('throwCard', userId);
    },

    gameStart({ commit, dispatch }) {
        commit('restartGame');
        //setup
        dispatch('fetchDeck').then(()=>{
            dispatch('fetchHand', 0); //first user
            dispatch('fetchHand', 1); //second user
            dispatch('randomStart');
        });
        commit('setGameStart', true);
    },

    takeCards({ commit }, userId) {
        commit('collectCards', userId);
    },

    setGameOver({ commit }, winner) {
        commit('gameOver', winner);
    }
};

const mutations = {
    restartGame: (state) => {
        state.finished = false;
        state.round = 0;
        state.winner = "";
        state.players[0].hand = [];
        state.players[1].hand = [];
        state.pile = [{card:null},{card: null}];
    },
    setGameStart: (state, value) => (state.game = value),
    setTurn: (state, userId) => (state.turn = userId),
    gameOver: (state, winner) => {
        state.winner = winner;
        state.finished = true;
    },
    incrementRound: (state) => (state.round++),
    setDeck: (state, deck) => {
        state.deck.deck_id = deck.deck_id;
        state.deck.shuffled = deck.shuffled;
        state.deck.remaining = deck.remaining;
    },
    setHand: (state, payload) => {
        let userId = parseInt(payload.playerID);
        payload.cards.forEach((card) => {
            state.players[userId].hand.push({
                'image': card.image,
                'value': card.value,
                'suit': card.suit,
                'code': card.code,
                'used': false
            })
        });
    },
    throwCard: (state, userId) => {
        state.players[userId].hand.shift();
    },
    collectCards: (state, userId) => {
        state.pile.forEach((card)=>{
            state.players[userId].hand.push(card.card);
        });
    },
    updateCardsAmount: (state, amount) => (state.deck.remaining = amount),
};

export default {
    state,
    getters,
    actions,
    mutations
}