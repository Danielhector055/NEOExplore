import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import App from "../app/index";

jest.mock("../services/NEONasa", () => ({
  fetchNEOs: jest.fn(() =>
    Promise.resolve([
      {
        
        "name": "Test Asteroid",
        "estimated_diameter": {
          "feet": {
            "estimated_diameter_max": 500
          }
        },
        "is_potentially_hazardous_asteroid": true,
        "close_approach_data": [
          {
            "relative_velocity": {
              "miles_per_hour": "20000"
            },
            "miss_distance": {
              "miles": "500000"
            }
          }
        ]
      },
    ])
  ),
}));

describe("App Component", () => {
  it("renders correctly", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(getByText("Near-Earth Objects")).toBeTruthy());
  });

  it("fetches and displays NEO data", async () => {
    const { getByText, findByText } = render(<App />);
    await waitFor(() => expect(findByText("Test Asteroid")).toBeTruthy());
    expect(findByText("Max Estimated Diameter: 500.00 ft")).toBeTruthy();
    expect(findByText("Velocity: 20000.00 mph")).toBeTruthy();
    expect(findByText("Miss Distance: 500000.00 miles")).toBeTruthy();
    expect(getByText("⚠️ Potentially Hazardous!")).toBeTruthy();
  });
});
