export interface EstimatedDiameter {
  feet: {
    estimated_diameter_max: number;
  };
}

export interface CloseApproachData {
  relative_velocity: { miles_per_hour: string };
  miss_distance: { miles: string };
}

export interface NEO {
  id: string;
  name: string;
  estimated_diameter: EstimatedDiameter;
  close_approach_data: CloseApproachData[];
  is_potentially_hazardous_asteroid: boolean;
}
