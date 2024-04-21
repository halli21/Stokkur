import { ImageSourcePropType } from "react-native";

export interface CardType {
  id: string;
  rank: number;
  suit: string;
  src: ImageSourcePropType;
}
