import { ImageSourcePropType } from "react-native";

import { Suit } from "./suit";

export interface CardType {
  id: string;
  rank: number;
  suit: Suit;
  src: ImageSourcePropType;
}
