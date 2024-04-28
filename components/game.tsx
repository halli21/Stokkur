import { TouchableOpacity, View, Text } from "react-native";
import { PlayerHand } from "../components/player_hand";
import { DiscardPile } from "./discardPile";
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
    <View className="h-full bg-custom-blue flex justify-center items-center">
      <DiscardPile />
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
