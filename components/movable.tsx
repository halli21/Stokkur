import React, { useRef } from 'react';
import { View, Animated, Dimensions, PanResponder } from 'react-native';

const { width } = Dimensions.get('window');
const gridSize = 3;
const itemSize = 100;
const space = 10;  // Spacing between grid items

// Calculates the initial position of each item in the grid
const calculateInitialPos = (index: number) => ({
  x: (index % gridSize) * (itemSize + space),
  y: Math.floor(index / gridSize) * (itemSize + space)
});



interface SwitchDragProps {
    index: number;
  }

export const MoveableItem = ({ index }: SwitchDragProps) => {
  const initialPos = calculateInitialPos(index);
  const pan = useRef(new Animated.ValueXY(initialPos)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // Reset to initial position for simplicity
        Animated.spring(pan, {
          toValue: initialPos,
          useNativeDriver: false
        }).start();
      }
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: pan.getTranslateTransform(),
        width: itemSize,
        height: itemSize,
        backgroundColor: 'red',
        position: 'absolute',
        left: initialPos.x,
        top: initialPos.y
      }}
      {...panResponder.panHandlers}
    />
  );
};