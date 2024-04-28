import { TouchableOpacity, View, Text } from "react-native";
import { PlayerHand } from "../components/player_hand";
import { Card } from "./card";
import { RootState } from "../context/store";
import { useSelector, useDispatch } from "react-redux";
import { shuffleDeck, drawCard } from "../context/reducers/gameSlice";
import { useEffect } from "react";

export const Game = () => {
  const dispatch = useDispatch();
  const currentHand = useSelector((state: RootState) => state.game.currentHand);
  const discardPile = useSelector((state: RootState) => state.game.discardPile);

  useEffect(() => {
    dispatch(shuffleDeck());
  });

  return (
    <View className="h-full flex justify-center items-center">
      <View className="m-3">
        {discardPile.length > 0 && (
          <Card card={discardPile[discardPile.length - 1]} index={9999} />
        )}
      </View>
      <TouchableOpacity
        className="bg-black
          px-10 py-5 rounded-lg"
        onPress={() => dispatch(drawCard())}
      >
        <Text className="text-white">Draw</Text>
      </TouchableOpacity>
      <PlayerHand hand={currentHand} />

  
    </View>
  );
};
