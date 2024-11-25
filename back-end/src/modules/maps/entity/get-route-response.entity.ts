export interface GetRouteResponse {
  data: {
    routes: [
      {
        distanceMeters: number;
        duration: string;
        legs: Leg[];
      },
    ];
  };
}

interface Leg {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: Polyline;
  startLocation: { latLng: LatLng };
  endLocation: { latLng: LatLng };
  steps: Step[];
  localizedValues: LocalizedValues;
}

interface Polyline {
  encodedPolyline: string;
}

interface LatLng {
  latitude: number;
  longitude: number;
}

interface Step {
  distanceMeters: number;
  staticDuration: string;
  polyline: Polyline;
  startLocation: LatLng;
  endLocation: LatLng;
  navigationInstruction: NavigationInstruction;
  localizedValues: LocalizedValues;
  travelMode: string;
}

interface NavigationInstruction {
  maneuver: string;
  instructions: string;
}

interface LocalizedValues {
  distance: LocalizedDistance;
  staticDuration: LocalizedDistance;
}

interface LocalizedDistance {
  text: string;
}
