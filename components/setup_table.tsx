import { View, Image, Text, TouchableOpacity } from "react-native";
import { SwitchDrag } from "./switch_drag";
import { useSharedValue } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

const arr = new Array(6).fill("").map((_, i) => i);

export const SetupTable = () => {
  const positions = useSharedValue(
    Object.assign({}, ...arr.map((item) => ({ [item]: item })))
  );

  const tableCards = useSelector((state: RootState) => state.game.tableCards);

  function handlePress() {
    console.log("i have started game");
  }

  return (
    <View className="min-w-full mt-30">
      <TouchableOpacity onPress={handlePress}>
        <View className="w-24 h-16 bg-green-600">
          <Text>Start Game Type shi</Text>
        </View>
      </TouchableOpacity>
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
  );
};
