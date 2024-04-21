import { Text, View, TouchableOpacity } from "react-native";
import { Card } from "./components/card";
import { Deck } from "./utils/deck";
import { useState } from "react";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleDraw = () => {
    const newIndex = Math.floor(Math.random() * 52);
    setCurrentIndex(newIndex);
  };

  return (
    <View className="h-full flex justify-center items-center">
      <Card card={Deck[currentIndex]} />

      <TouchableOpacity
        className="bg-custom-blue
         mt-5 px-10 py-5 rounded-lg"
        onPress={handleDraw}
      >
        <Text className="text-white">Draw</Text>
      </TouchableOpacity>
    </View>
  );
}
