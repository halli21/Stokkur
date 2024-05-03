import { TouchableOpacity, View, Text } from "react-native";
import { PlayerHand } from "../components/player_hand";
import { DiscardPile } from "./discardPile";
import { RootState } from "../context/store";
import { useSelector, useDispatch } from "react-redux";
import { startGame, drawCard } from "../context/reducers/gameSlice";
import { useEffect } from "react";
import { SetupTable } from "./setup_table";

export const Game = () => {
  const dispatch = useDispatch();
  const currentHand = useSelector((state: RootState) => state.game.currentHand);

  useEffect(() => {
    dispatch(startGame());
  }, []);
  // remember empty dependency array!

  return (
    <View className="h-full bg-custom-blue flex justify-center items-center">
      <SetupTable />
    </View>
  );
};


// <DiscardPile />
// <TouchableOpacity
//   className="bg-black
// px-10 py-5 rounded-lg"
//   onPress={() => dispatch(drawCard())}
// >
//   <Text className="text-white">Draw</Text>
// </TouchableOpacity>
// <PlayerHand hand={currentHand} />
// <Text>{currentHand.length}</Text>
