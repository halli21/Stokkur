import { View, Image, Text, TouchableOpacity } from "react-native";
import { SwitchDrag } from "./switch_drag";
import { useSharedValue } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { setTableCardsPositions } from "../context/reducers/gameSlice";
import { useState } from "react";
import { PositionMap } from "../type/position";
import { getPosition } from "../utils/screenPositions/setup_table";

export const SetupTable = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false); // dummy state to simulate game starting

  const dispatch = useDispatch();

  const arr = Array.from({ length: 6 }, (_, i) => i);
  const positions = useSharedValue<PositionMap>(
    Object.assign({}, ...arr.map((item) => ({ [item]: item })))
  );

  const tableCards = useSelector((state: RootState) => state.game.tableCards);

  function handlePress() {
    dispatch(setTableCardsPositions(positions.value));
    setGameStarted(true);
  }

  return (
    <View className="min-w-full mt-30">
      <TouchableOpacity onPress={handlePress}>
        <View className="w-24 h-16 bg-green-600 rounded-md">
          <Text className="text-center">Dummy Start Game</Text>
        </View>
      </TouchableOpacity>

      {/* simulates two seperate components, one for setting up the game and one where the game has actually started */}
      {!gameStarted ? (
        <View>
          {tableCards.map((item, index) => {
            return (
              <View key={index}>
                <SwitchDrag index={index} positions={positions}>
                  <Image className="w-16 h-24" source={item.src} />
                </SwitchDrag>
              </View>
            );
          })}
        </View>
      ) : (
        <View className="relative min-w-full">
          {tableCards.map((card, index) => {
            const position = getPosition(index);
            return (
              <View
                key={index}
                className="absolute"
                style={{ left: position.x, top: position.y }}
              >
                <Image className="w-16 h-24" source={card.src} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
