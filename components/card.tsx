import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { CardType } from "../type/card";
import { RootState } from "../context/store";
import { useSelector, useDispatch } from "react-redux";

import { playCard } from "../context/reducers/gameSlice";
import { selectCard } from "../context/reducers/gameSlice";

interface CardProps {
  card: CardType;
  index: number;
}

export const Card = ({ card, index }: CardProps) => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.game.selectedCards
  );
  const isSelected = selectedCards.some(
    (selectedCard) => selectedCard.id === card.id
  );

  return (
    <TouchableOpacity
      onPress={() => dispatch(selectCard(index))}
      className={`border-2 border-transparent rounded-md mt-3 ${
        isSelected && "border-green-400 mt-0"
      }`}
    >
      <Image className="w-16 h-24" source={card.src} />
    </TouchableOpacity>
  );
};
