import { Dimensions } from "react-native";

const COL = 3;
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const SIZE = (WINDOW_WIDTH - (COL + 1)) / COL;

export const getPosition = (index: number) => {
  "worklet";
  return {
    x: (index % COL) * SIZE + SIZE / 4,
    y: Math.floor(index / COL) * SIZE,
  };
};

export const getOrder = (x: number, y: number) => {
  "worklet";
  const row = Math.round(y / SIZE);
  const col = Math.round((x - SIZE / 4) / SIZE);
  return row * COL + col;
};
