import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface NEOProps {
  name: string;
  diameter: number;
  velocity: number;
  missDistance: number;
  isHazardous: boolean;
}

const NEOCard: React.FC<NEOProps> = ({ name, diameter, velocity, missDistance, isHazardous }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text>Max Estimated Diameter: {diameter.toFixed(2)} ft</Text>
      <Text>Velocity: {velocity.toFixed(2)} mph</Text>
      <Text>Miss Distance: {missDistance.toFixed(2)} miles</Text>
      <Text style={isHazardous ? styles.hazardous : styles.safe}>
        {isHazardous ? "⚠️ Potentially Hazardous!" : "✅ Not Hazardous"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  hazardous: { color: "red", fontWeight: "bold" },
  safe: { color: "green", fontWeight: "bold" },
});

export default NEOCard;
