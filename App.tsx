import { Text, View, Image } from "react-native";
import { Card } from "./components/card";
import { Deck } from "./utils/deck";

export default function App() {
  return (
    <View className="h-full flex justify-center items-center">
      <Text className="text-blue-600">This is styled with tailwind</Text>
      <Card card={Deck[0]} />
    </View>
  );
}
