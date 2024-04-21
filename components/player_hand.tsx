import { View, Text, ScrollView, FlatList } from "react-native";
import { CardType } from "../type/card";
import { Card } from "./card";

interface PlayerHandProps {
  hand: CardType[];
}

export const PlayerHand = ({ hand }: PlayerHandProps) => {
  return (
    <FlatList
      horizontal
      data={hand}
      renderItem={({ item, index }) => (
        <View className="mx-1">
          <Card key={item.id} card={item} />
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

// Using gap/space in PlayerHand wasn't working so mx-1 is a placeholder until it is resolved
