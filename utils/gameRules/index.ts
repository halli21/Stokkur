import { CardType } from "../../type/card";

export default function canPlayCard(
  selectedCard: CardType,
  playedCards: CardType[]
) {
  if (playedCards.length === 0) {
    return true;
  }

  // Magic cards
  if (
    selectedCard.rank === 2 ||
    selectedCard.rank === 5 ||
    selectedCard.rank === 9 ||
    selectedCard.rank === 10
  ) {
    return true;
  }

  let topCard = playedCards[playedCards.length - 1];

  if (topCard.rank === 9) {
    const newTopCard = getLastNonNineCard(playedCards);
    if (newTopCard) {
      topCard = newTopCard;
    } else {
      // The playedCards only contains 9s, any card can be played
      return true;
    }
  }

  // Handle 5 magic card, needs to be lower
  if (topCard.rank === 5) {
    return selectedCard.rank <= 5;
  }

  if (topCard.rank <= selectedCard.rank) {
    return true;
  }

  return false;
}

// Since 9 is invisible we need to find the card below to use as topCard,
// however a series of 9s can be played so precautions taken with this function
function getLastNonNineCard(playedCards: CardType[]) {
  let i = playedCards.length - 2;
  while (i >= 0 && playedCards[i].rank === 9) {
    i--;
  }

  if (i < 0) {
    return undefined;
  }

  const lastNonNineCard = playedCards[i];
  return lastNonNineCard;
}
