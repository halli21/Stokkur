import { View, Image, Dimensions, Text } from "react-native";
import { CardType } from "../type/card";
import { SwitchDrag } from "./switch_drag";
import { useSharedValue } from "react-native-reanimated";

const path = "../assets/cardImages";

const tableCards: CardType[] = [
  {
    id: "AC",
    rank: 14,
    suit: "C",
    src: require(path + "/AC.png"),
  },
  {
    id: "AD",
    rank: 14,
    suit: "D",
    src: require(path + "/AD.png"),
  },
  {
    id: "AH",
    rank: 14,
    suit: "H",
    src: require(path + "/AH.png"),
  },
  {
    id: "KC",
    rank: 13,
    suit: "C",
    src: require(path + "/KC.png"),
  },
  {
    id: "KD",
    rank: 13,
    suit: "D",
    src: require(path + "/KD.png"),
  },
  {
    id: "KH",
    rank: 13,
    suit: "H",
    src: require(path + "/KH.png"),
  },
];

const arr = new Array(6).fill("").map((_, i) => i);

export const SetupTable = () => {
  const positions = useSharedValue(
    Object.assign({}, ...arr.map((item) => ({ [item]: item })))
  );

  return (
    <View className="min-w-full mt-48">
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
