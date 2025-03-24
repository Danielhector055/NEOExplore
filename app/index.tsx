import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import NEOCard from "../components/NEOCard"; // Import the component

const API_KEY = "lTHPxbpwqnn3thI5aiCieLtOpT1MZ85pxbkRI9tN";

// Define a proper type for NEO
interface NEO {
  id: string;
  name: string;
  estimated_diameter: {
    feet: {
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    relative_velocity: { miles_per_hour: string };
    miss_distance: { miles: string };
  }[];
  is_potentially_hazardous_asteroid: boolean;
}

export default function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [neos, setNeos] = useState<NEO[]>([]); // Explicitly define type
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const fetchNEOs = async () => {
    setLoading(true);
    const formattedDate = date.toISOString().split("T")[0];

    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${API_KEY}`
      );
      const neosForDate: NEO[] =
        response.data.near_earth_objects[formattedDate] || [];
      setNeos(neosForDate);
    } catch (error) {
      console.error("Error fetching NEOs:", error);
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
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={fetchNEOs}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Fetch NEOs"}
        </Text>
      </TouchableOpacity>

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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dateButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dateButtonText: { color: "#fff", fontWeight: "bold" },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
