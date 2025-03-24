import React from "react";
import { render } from "@testing-library/react-native";
import NEOCard from "../components/NEOCard";

describe("NEOCard Component", () => {
  it("renders correctly with given props", () => {
    const { getByText } = render(
      <NEOCard
        name="Asteroid 2024"
        diameter={500}
        velocity={25000}
        missDistance={1000000}
        isHazardous={true}
      />
    );

    expect(getByText("Asteroid 2024")).toBeTruthy();
    expect(getByText("Max Estimated Diameter: 500.00 ft")).toBeTruthy();
    expect(getByText("Velocity: 25000.00 mph")).toBeTruthy();
    expect(getByText("Miss Distance: 1000000.00 miles")).toBeTruthy();
    expect(getByText("⚠️ Potentially Hazardous!")).toBeTruthy();
  });
});
