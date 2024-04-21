import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../type/card";
import { Deck } from "../../utils/deck";

interface GameState {
  deck: CardType[];
  currentHand: CardType[];
  discardPile: CardType[];
}

const initialState: GameState = {
  deck: Deck,
  currentHand: [],
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
        }
      }
    },
    playCard(state: GameState, action: PayloadAction<number>) {
      const cardIndex = action.payload;
      if (cardIndex < state.currentHand.length && cardIndex >= 0) {
        const card = state.currentHand.splice(cardIndex, 1)[0];
        state.discardPile.push(card);
      }
    },
    resetGame(state: GameState) {
      state.deck = [];
      state.currentHand = [];
      state.discardPile = [];
    },
  },
});

export const { drawCard, playCard, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
