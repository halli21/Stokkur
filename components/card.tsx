import { View, Text, Image } from "react-native";
import { ImageSourcePropType } from "react-native";

// TODO abstract from card component itself
// images that are bundled into the app need to be loaded using require
type CardImageMap = { [key: string]: ImageSourcePropType };
interface CardProps {
  rank: string;
  suit: string;
}

const cardImages: CardImageMap = {
  "2C": require("../assets/cardImages/2C.png"),
  "2D": require("../assets/cardImages/2D.png"),
  "2H": require("../assets/cardImages/2H.png"),
  "2S": require("../assets/cardImages/2S.png"),

  "3C": require("../assets/cardImages/3C.png"),
  "3D": require("../assets/cardImages/3D.png"),
  "3H": require("../assets/cardImages/3H.png"),
  "3S": require("../assets/cardImages/3S.png"),

  "4C": require("../assets/cardImages/4C.png"),
  "4D": require("../assets/cardImages/4D.png"),
  "4H": require("../assets/cardImages/4H.png"),
  "4S": require("../assets/cardImages/4S.png"),

  "5C": require("../assets/cardImages/5C.png"),
  "5D": require("../assets/cardImages/5D.png"),
  "5H": require("../assets/cardImages/5H.png"),
  "5S": require("../assets/cardImages/5S.png"),

  "6C": require("../assets/cardImages/6C.png"),
  "6D": require("../assets/cardImages/6D.png"),
  "6H": require("../assets/cardImages/6H.png"),
  "6S": require("../assets/cardImages/6S.png"),

  "7C": require("../assets/cardImages/7C.png"),
  "7D": require("../assets/cardImages/7D.png"),
  "7H": require("../assets/cardImages/7H.png"),
  "7S": require("../assets/cardImages/7S.png"),

  "8C": require("../assets/cardImages/8C.png"),
  "8D": require("../assets/cardImages/8D.png"),
  "8H": require("../assets/cardImages/8H.png"),
  "8S": require("../assets/cardImages/8S.png"),

  "9C": require("../assets/cardImages/9C.png"),
  "9D": require("../assets/cardImages/9D.png"),
  "9H": require("../assets/cardImages/9H.png"),
  "9S": require("../assets/cardImages/9S.png"),

  "10C": require("../assets/cardImages/10C.png"),
  "10D": require("../assets/cardImages/10D.png"),
  "10H": require("../assets/cardImages/10H.png"),
  "10S": require("../assets/cardImages/10S.png"),

  JC: require("../assets/cardImages/JC.png"),
  JD: require("../assets/cardImages/JD.png"),
  JH: require("../assets/cardImages/JH.png"),
  JS: require("../assets/cardImages/JS.png"),

  QC: require("../assets/cardImages/QC.png"),
  QD: require("../assets/cardImages/QD.png"),
  QH: require("../assets/cardImages/QH.png"),
  QS: require("../assets/cardImages/QS.png"),

  KC: require("../assets/cardImages/KC.png"),
  KD: require("../assets/cardImages/KD.png"),
  KH: require("../assets/cardImages/KH.png"),
  KS: require("../assets/cardImages/KS.png"),

  AC: require("../assets/cardImages/AC.png"),
  AD: require("../assets/cardImages/AD.png"),
  AH: require("../assets/cardImages/AH.png"),
  AS: require("../assets/cardImages/AS.png"),
};

export const Card = ({ rank, suit }: CardProps) => {
  const imageKey = `${rank}${suit}`;

  return (
 
      <Image
        className="w-32 h-48"
        source={cardImages[imageKey]}
      />
   
  );
};
