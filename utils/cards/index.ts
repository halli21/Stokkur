import { CardType } from "../../type/card";

// Function to get the last four cards of the deck/pile
export function getLastFourCards(array: CardType[]): CardType[] {
  return array.slice(-4);
}

export function getLastTwoCards(array: CardType[]): CardType[] {
  return array.slice(-2);
}
