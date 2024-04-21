import { Image } from "react-native";
import { CardType } from "../type/card";

interface CardProps {
  card: CardType;
}

export const Card = ({ card }: CardProps) => {
  return <Image className="w-32 h-48" source={card.src} />;
};