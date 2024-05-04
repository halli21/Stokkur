import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Position } from "../type/position";

interface DraggableProps {
  children: React.ReactNode;
  discardPilePos: Position;
}

type ContextType = {
  pageX: number;
  pageY: number;
  startX: number;
  startY: number;
};

export const DraggableComponent = ({
  children,
  discardPilePos,
}: DraggableProps) => {
  const aref = useAnimatedRef();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;

      const measured = measure(aref);
      if (measured !== null) {
        const { pageX, pageY } = measured;
        ctx.pageX = pageX;
        ctx.pageY = pageY;
      } else {
        console.warn("measure: could not measure view");
      }
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;
    },
    onEnd: (_, ctx) => {
      const destinationX = discardPilePos.x - ctx.pageX;
      const destinationY = discardPilePos.y - ctx.pageY;

      translateX.value = withTiming(destinationX);
      translateY.value = withTiming(destinationY);
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
    <Animated.View style={animatedStyle} ref={aref}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
