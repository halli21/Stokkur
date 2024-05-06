import { View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Position } from "../type/position";

interface DraggableProps {
  children: React.ReactNode;
  discardPilePos: Position;
  onCardPlayed: () => void;
}

type ContextType = {
  pageX: number;
  pageY: number;
  startX: number;
  startY: number;
};

export const TestDrag = ({
  children,
  discardPilePos,
  onCardPlayed,
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
    onEnd: (evt, ctx) => {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);

      const destinationX = discardPilePos.x - ctx.pageX;
      const destinationY = discardPilePos.y - ctx.pageY;

      const finalX = ctx.pageX + evt.translationX;
      const finalY = ctx.pageY + evt.translationY;

      const dummySize = 100;

      if (
        finalX > discardPilePos.x - dummySize &&
        finalX < discardPilePos.x + dummySize &&
        finalY > discardPilePos.y - dummySize &&
        finalY < discardPilePos.y + dummySize
      ) {
        translateX.value = withTiming(destinationX, {}, () => {
          translateY.value = withTiming(destinationY, {}, () => {
            runOnJS(onCardPlayed)();
          });
        });
        translateY.value = withTiming(destinationY);
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    },
    onFinish: () => {},
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
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