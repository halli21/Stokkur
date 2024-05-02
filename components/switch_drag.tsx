import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  ViewStyle,
  PanResponderGestureState,
  Dimensions,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface SwitchDragProps {
  children: React.ReactNode;
}

export const SwitchDrag = ({ children }: SwitchDragProps) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: (e, gestureState: PanResponderGestureState) => {
       
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};
