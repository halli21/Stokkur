import { Image, TouchableOpacity } from "react-native";
import { CardType } from "../type/card";

interface CardProps {
  card: CardType;
}

export const Card = ({ card }: CardProps) => {
  return (
    <TouchableOpacity>
      <Image className="w-16 h-24" source={card.src} />
    </TouchableOpacity>
  );
};
