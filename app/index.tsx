import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const index = () => {
  return (
    <View className="py-4 px-4 h-full w-full">
      <Text className="font-bold text-center text-3xl underline mb-5">
        Gesture Handler tutorial
      </Text>
      <Link href={"/gestureCompositionInteractions"}>
        <Text className=" font-semibold ">
          1.Gesture composition & interactions
        </Text>
      </Link>
    </View>
  );
};

export default index;
