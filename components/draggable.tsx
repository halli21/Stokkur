import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface DraggableProps {
  children: React.ReactNode;
}

type ContextType = {
  startX: number;
  startY: number;
};

export const DraggableComponent = ({ children }: DraggableProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;
    },
    onEnd: () => {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    },
    onFinish: () => {},
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
