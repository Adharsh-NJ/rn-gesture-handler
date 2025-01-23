import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Race from "@/components/gestureCompositionInteraction/race";
import Simulataneous from "@/components/gestureCompositionInteraction/simulataneous";
import Exclusive from "@/components/gestureCompositionInteraction/exclusive";
// Import other components for demonstration

const GestureCompositionInteractions = () => {
  const [activeTab, setActiveTab] = useState("Race");

  const renderContent = () => {
    switch (activeTab) {
      case "Race":
        return <Race />;
      case "Simultaneous":
        return <Simulataneous />;
      case "Exclusive":
        return <Exclusive />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "lightgray", padding: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
        Gesture Composition & Interactions
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <Button
          title="Race"
          onPress={() => setActiveTab("Race")}
          color={activeTab === "Race" ? "red" : "black"}
        />
        <Button
          title="Simultaneous"
          onPress={() => setActiveTab("Simultaneous")}
          color={activeTab === "Simultaneous" ? "red" : "black"}
        />
        <Button
          title="Exclusive"
          onPress={() => setActiveTab("Exclusive")}
          color={activeTab === "Exclusive" ? "red" : "black"}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {renderContent()}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  active: { backgroundColor: "red" },
});
export default GestureCompositionInteractions;
