import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Text, View } from "react-native";
import { useState } from "react";

function Race() {
  const offset = useSharedValue({ x: 10, y: 10 });
  const backgroundColor = useSharedValue("red");
  const [gestureState, setGestureState] = useState({
    dragging: false,
    longPress: false,
  });
  const [t, setT] = useState(false);
  // Animated style for the box
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
      backgroundColor: backgroundColor.value,
    };
  });

  // Drag Gesture
  const panGesture = Gesture.Pan()
    .onStart(() => {
      console.log("drag");
      runOnJS(setGestureState)({ dragging: true, longPress: false });
    })
    .onUpdate((event) => {
      offset.value = {
        x: event.translationX,
        y: event.translationY,
      };
    })
    .onEnd(() => {
      runOnJS(setGestureState)({ dragging: false, longPress: false });
      offset.value = {
        x: withTiming(10),
        y: withTiming(10),
      };
      backgroundColor.value = withTiming("red");
    });

  // Long Press Gesture
  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      console.log("long");
      runOnJS(setGestureState)({ dragging: false, longPress: true });
      // gestureState.value = { dragging: false, longPress: true };
      backgroundColor.value = withTiming("blue");
    })
    .onEnd(() => {
      runOnJS(setGestureState)({ dragging: false, longPress: false });

      // gestureState.value = { dragging: false, longPress: false };
      backgroundColor.value = withTiming("red");
    });

  // Use Gesture.Race to prioritize whichever starts first
  const raceGesture = Gesture.Race(panGesture, longPressGesture);

  return (
    <View className=" w-full h-full items-center">
      <Text
        style={{ textAlign: "center", marginBottom: 8 }}
        className=" text-center mb-2"
      >
        The Gesture.Race method in React Native Gesture Handler allows you to
        create a "race" condition between two or more gestures. When you use
        Gesture.Race, the first gesture to activate cancels the other gestures
        in the race. This is particularly useful when you have multiple gestures
        that shouldn't occur simultaneously but need to compete to take
        precedence. .Race function prioritizes whichever gesture starts first.
        If drag gesture becomes active, long press won't activate.
      </Text>
      <Animated.Text className={"font-bold text-center"}>
        {gestureState.dragging
          ? "Dragging"
          : gestureState.longPress
          ? "Long Press"
          : "Please Drag or Long Press"}
      </Animated.Text>
      <View className="flex-1 justify-center items-center">
        <GestureDetector gesture={raceGesture}>
          <Animated.View
            style={[
              animatedStyles,
              { width: 100, height: 100, borderRadius: 10 },
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
}

export default Race;
