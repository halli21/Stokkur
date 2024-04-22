import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  UIManager,
  View,
  findNodeHandle,
} from "react-native";

interface DraggableProps {
  children: React.ReactNode;
}

export const DraggableComponent = ({ children }: DraggableProps) => {
  const componentRef = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        const handle = findNodeHandle(componentRef.current);
        if (handle) {
          UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          });
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={pan.getLayout()}
      ref={componentRef}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};