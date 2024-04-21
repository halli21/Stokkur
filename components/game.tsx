import { TouchableOpacity, View, Text } from "react-native";
import { PlayerHand } from "../components/player_hand";
import { Card } from "./card";
import { RootState } from "../context/store";
import { useSelector, useDispatch } from "react-redux";
import { drawCard } from "../context/reducers/gameSlice";

export const Game = () => {
  const dispatch = useDispatch();
  const currentHand = useSelector((state: RootState) => state.game.currentHand);
  const discardPile = useSelector((state: RootState) => state.game.discardPile);

  return (
    <View className="h-full flex justify-center items-center place-content-center">
      <TouchableOpacity
        className="bg-black
          mt-5 px-10 py-5 rounded-lg"
        onPress={() => dispatch(drawCard())}
      >
        <Text className="text-white">Draw</Text>
      </TouchableOpacity>
      <PlayerHand hand={currentHand} />

      {discardPile.length > 0 && (
        <Card card={discardPile[discardPile.length - 1]} index={9999} />
      )}
    </View>
  );
};
