import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";
import { Text, View } from "react-native";
import { useState } from "react";

function Exclusive() {
  const [gestureState, setGestureState] = useState({
    single: false,
    double: false,
  });
  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      runOnJS(setGestureState)({ double: false, single: true });
    }
  });
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(setGestureState)({ double: true, single: false });
      }
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);
  return (
    <View className="w-full h-full items-center">
      <Text style={{ textAlign: "center", marginBottom: 8 }}>
        Only one of the provided gestures can become active, with the first one
        having a higher priority than the second one (if both gestures are still
        possible, the second one will wait for the first one to fail before it
        activates), second one having a higher priority than the third one, and
        so on. It is equivalent to having some gesture handlers where the second
        one has the waitFor prop set to the first handler, third one has the
        waitFor prop set to the first and the second one, and so on.
      </Text>
      <Animated.Text style={{ textAlign: "center", fontWeight: "bold" }}>
        {gestureState.single
          ? "single tap"
          : gestureState.double
          ? "double tap"
          : "do single tap or double tap"}
      </Animated.Text>
      <View className="flex-1 justify-center items-center">
        <GestureDetector gesture={taps}>
          <Animated.View
            style={[
              {
                width: 100,
                height: 100,
                borderRadius: 10,
                backgroundColor: "red",
              },
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
}

export default Exclusive;
