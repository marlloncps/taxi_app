/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ridesAtom } from "../shared/atoms";

const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export default function GoogleMapComponent() {
  const [{ origin, destination }] = useRecoilState(ridesAtom);
  const googleMapsApiKey = process.env.GOOGLE_API_KEY ?? "";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  const { latitude: originLat, longitude: originLng } = origin;
  const { latitude: destinationLat, longitude: destinationLng } = destination;

  const [directions, setDirections] = useState<any>(null);

  if (!isLoaded) return <div>Loading...</div>;

  const handleDirectionsCallback = (response: any) => {
    if (response.status === "OK") {
      setDirections(response);
    } else {
      console.error("Error fetching directions: ", response);
    }
  };

  return (
    <Box width={"1100px"} mt={2} height={"500px"}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.3)",
        }}
        options={{
          disableDefaultUI: true,
        }}
        center={center}
        zoom={12}
      >
        <Marker position={{ lat: originLat, lng: originLng }} />
        <Marker position={{ lat: destinationLat, lng: destinationLng }} />

        <DirectionsService
          options={{
            destination: { lat: destinationLat, lng: destinationLng },
            origin: { lat: originLat, lng: originLng },
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={handleDirectionsCallback}
        />

        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
            }}
          />
        )}
      </GoogleMap>
    </Box>
  );
}
