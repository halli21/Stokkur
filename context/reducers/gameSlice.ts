import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../type/card";
import { Deck } from "../../utils/deck";
import shuffleArray from "../../utils/cards/shuffleArray";
import sortCards from "../../utils/cards/sortCards";
import { canPlayCard, checkForBomb } from "../../utils/gameRules";
import { getLastFourCards } from "../../utils/cards";

interface GameState {
  deck: CardType[];
  currentHand: CardType[];
  selectedCards: CardType[];
  discardPile: CardType[];
}

const initialState: GameState = {
  deck: Deck,
  currentHand: [],
  selectedCards: [],
  discardPile: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,

  reducers: {
    drawCard(state: GameState) {
      if (state.deck.length > 0) {
        const nextCard = state.deck.shift();
        if (nextCard) {
          state.currentHand.push(nextCard);
          state.currentHand = sortCards([...state.currentHand]);
        }
      }
    },
    playCard(state: GameState, action: PayloadAction<CardType>) {
      const latestCards = getLastFourCards(state.discardPile);
      const cardToPlay = action.payload;
      const playable = canPlayCard(cardToPlay, latestCards);
      const cardIndex = state.currentHand.findIndex(
        (card) => card.id === cardToPlay.id
      );
      if (cardIndex >= 0 && playable) {
        state.currentHand.splice(cardIndex, 1);
        state.discardPile.push(cardToPlay);
      }

      if (cardToPlay.rank === 10) {
        state.discardPile = [];
      } else if (state.discardPile.length > 3) {
        const bombCards = getLastFourCards(state.discardPile);
        const isBomb = checkForBomb(bombCards);
        if (isBomb) {
          state.discardPile = [];
        }
      }
    },
    selectCard(state: GameState, action: PayloadAction<CardType>) {
      const cardToPlay = action.payload;
      const selectedIndex = state.selectedCards.findIndex(
        (c) => c.id === cardToPlay.id
      );

      if (selectedIndex >= 0) {
        state.selectedCards.splice(selectedIndex, 1);
      } else {
        state.selectedCards.push(cardToPlay);
      }
    },
    resetGame(state: GameState) {
      state.deck = [];
      state.currentHand = [];
      state.discardPile = [];
    },
    shuffleDeck(state: GameState) {
      state.deck = shuffleArray([...state.deck]);
    },
    pickUpDeck(state: GameState) {
      if (state.discardPile.length > 0) {
        state.currentHand = state.currentHand.concat(state.discardPile);
        state.discardPile = [];
        state.currentHand = sortCards([...state.currentHand]);
      }
    },
  },
});

export const {
  drawCard,
  playCard,
  selectCard,
  resetGame,
  shuffleDeck,
  pickUpDeck,
} = gameSlice.actions;
export default gameSlice.reducer;
