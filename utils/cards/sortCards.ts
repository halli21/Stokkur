import { CardType } from "../../type/card";

const suitValues = {
  C: { value: 1 },
  D: { value: 2 },
  H: { value: 3 },
  S: { value: 4 },
};

export default function sortCards(cards: CardType[]) {
  cards.sort((a, b) => {
    if (a.rank < b.rank) {
      return -1;
    } else if (a.rank > b.rank) {
      return 1;
    } else {
      if (suitValues[a.suit].value < suitValues[b.suit].value) {
        return -1;
      } else {
        return 1;
      }
    }
  });
  return cards;
}
