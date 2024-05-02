import { View, Image } from "react-native";
import { CardType } from "../type/card";
import { SwitchDrag } from "./switch_drag";

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

export const SetupTable = () => {
  return (
    <View className="flex flex-3 flex-row flex-wrap gap-y-5 bg-black min-w-full mt-8">
      {tableCards.map((card, index) => {
        return (
          <View key={index} className="flex items-center justify-center w-1/3">
            <SwitchDrag>
              <Image className="w-16 h-24" source={card.src} />
            </SwitchDrag>
          </View>
        );
      })}
    </View>
  );
};
