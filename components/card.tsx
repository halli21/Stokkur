import { View, Text } from "react-native";

interface CardProps {
  suit: string;
  rank: string;
}

export const Card = ({ suit, rank }: CardProps) => {
  return <Text className="text-blue-600">{`${suit} ${rank}`}</Text>;
};
