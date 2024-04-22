import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../type/card";
import { Deck } from "../../utils/deck";

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
    selectCard(state: GameState, action: PayloadAction<number>) {
      const cardIndex = action.payload;
      if (cardIndex < 0 || cardIndex >= state.currentHand.length) return;

      const card = state.currentHand[cardIndex];
      const selectedIndex = state.selectedCards.findIndex(
        (c) => c.id === card.id
      );

      if (selectedIndex >= 0) {
        state.selectedCards.splice(selectedIndex, 1);
      } else {
        state.selectedCards.push(card);
      }
    },
    resetGame(state: GameState) {
      state.deck = [];
      state.currentHand = [];
      state.discardPile = [];
    },
  },
});

export const { drawCard, playCard, selectCard, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
