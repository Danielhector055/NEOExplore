import axios from "axios";
import { NEO } from "../types/NEO";

const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const API_URL = "https://api.nasa.gov/neo/rest/v1/feed";

export const NEONasa = {
  fetchNEOs: async (date: string): Promise<NEO[]> => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          start_date: date,
          end_date: date,
          api_key: API_KEY,
        },
      });
      return response.data.near_earth_objects[date] || [];
    } catch (error) {
      console.error("Error fetching NEOs:", error);
      return [];
    }
  },
};
