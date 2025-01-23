import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Text, View } from "react-native";

function Simultaneous() {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
        { rotateZ: `${rotation.value}rad` },
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture)
  );

  return (
    <Animated.View className={"w-full h-full"}>
      <Text className=" text-center mb-2">
        All of the provided gestures can activate at the same time. Activation
        of one will not cancel the other. It is the equivalent to having some
        gesture handlers, each with simultaneousHandlers prop set to the other
        handlers.
      </Text>
      <Text className=" font-bold text-center">
        you can drag,pinch to zoom and rotate
      </Text>
      <View className="flex-1 justify-center items-center">
        <GestureDetector gesture={composed}>
          <Animated.View
            style={[
              animatedStyles,
              {
                width: 100,
                height: 100,
                borderRadius: 10,
                backgroundColor: "red",
              },
            ]}
          ></Animated.View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
}

export default Simultaneous;
