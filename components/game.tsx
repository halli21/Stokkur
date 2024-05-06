import { TouchableOpacity, View, Text, Image, Dimensions } from "react-native";
import { PlayerHand } from "../components/player_hand";
import { DiscardPile } from "./discard_pile";
import { RootState } from "../context/store";
import { useSelector, useDispatch } from "react-redux";
import { startGame, drawCard } from "../context/reducers/gameSlice";
import { useEffect } from "react";
import { SetupTable } from "./setup_table";
import { CardType } from "../type/card";
import { TestDrag } from "./test_drag";

const path = "../assets/cardImages";
const dummyHand: CardType[] = [
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
    id: "AS",
    rank: 14,
    suit: "S",
    src: require(path + "/AS.png"),
  },
];

const dummyDiscardPile: CardType[] = [];

// fake for now to allow rendering of recently played
// TODO: fix this
const mostRecentlyPlayedCard: CardType = {
  id: "AS",
  rank: 0,
  suit: "S",
  src: require(path + "/AS.png"),
};

export const Game = () => {
  const WINDOW_WIDTH = Dimensions.get("window").width;

  const discardPileX = WINDOW_WIDTH / 2 - 30;
  const discardPileY = 100;

  const dispatch = useDispatch();
  const currentHand = useSelector((state: RootState) => state.game.currentHand);

  useEffect(() => {
    dispatch(startGame());
  }, []);
  // remember empty dependency array!

  return (
    <View className="h-full bg-custom-blue flex justify-center items-center">
      {mostRecentlyPlayedCard.id !== "none" && (
        <View
          style={{
            position: "absolute",
            top: discardPileY,
            left: discardPileX,
            backgroundColor: "red",
            width: 160,
            height: 190
          }}
        >
          <Image className="w-16 h-24" source={mostRecentlyPlayedCard.src} />
        </View>
      )}
      <View className="flex flex-row gap-x-3">
        {dummyHand.map((card, index) => (
          <View key={index}>
            <TestDrag discardPilePos={{ x: discardPileX, y: discardPileY }}>
              <Image className="w-16 h-24" source={card.src} />
            </TestDrag>
          </View>
        ))}
      </View>
    </View>
  );
};

{
  /* <DiscardPile />
<TouchableOpacity
  className="bg-black
px-10 py-5 rounded-lg mt-64"
  onPress={() => dispatch(drawCard())}
>
  <Text className="text-white">Draw</Text>
</TouchableOpacity>
<PlayerHand hand={currentHand} />
<Text>{currentHand.length}</Text> */
}
