import "../app/_layout"; // Temporary fix
import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NEONasa } from "../services/NEONasa";
import NEOCard from "../components/NEOCard";
import { NEO } from "../types/NEO";

export default function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [neos, setNeos] = useState<NEO[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const data = await NEONasa.fetchNEOs(formattedDate); // Using NEONasa
      setNeos(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch NEO data.");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Near-Earth Objects</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateButtonText}>
          Select Date: {date.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          themeVariant="light"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={neos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NEOCard
              name={item.name}
              diameter={item.estimated_diameter.feet.estimated_diameter_max}
              velocity={parseFloat(
                item.close_approach_data[0].relative_velocity.miles_per_hour
              )}
              missDistance={parseFloat(
                item.close_approach_data[0].miss_distance.miles
              )}
              isHazardous={item.is_potentially_hazardous_asteroid}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No NEOs found.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  dateButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dateButtonText: { color: "#fff", fontWeight: "bold" },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
});