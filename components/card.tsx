import { Image, TouchableOpacity } from "react-native";
import { CardType } from "../type/card";
import { playCard } from "../context/reducers/gameSlice";
import { useDispatch } from "react-redux";

interface CardProps {
  card: CardType;
  index: number;
}

export const Card = ({ card, index }: CardProps) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => dispatch(playCard(index))}>
      <Image className="w-16 h-24" source={card.src} />
    </TouchableOpacity>
  );
};
