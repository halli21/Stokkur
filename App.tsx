import { Text, View } from "react-native";
import { Card } from "./components/card";

export default function App() {
  return (
    <View className="h-full flex justify-center items-center">
      <Text className="text-blue-600">This is styled with tailwind</Text>
      <Card rank="A" suit="H" />
    </View>
  );
}
