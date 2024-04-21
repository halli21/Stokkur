import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface DraggableProps {
  children: React.ReactNode;
}

export const Draggable = ({ children }: DraggableProps) => {
  return (
    <Animated.View>
      <PanGestureHandler>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
