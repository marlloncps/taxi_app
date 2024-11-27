/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!originLat || !originLng || !destinationLat || !destinationLng) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destinationLat, lng: destinationLng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          setDirections(response);
        } else {
          console.error("Error fetching directions: ", status);
        }
      }
    );
  }, [originLat, originLng, destinationLat, destinationLng]); // Depend on origin and destination changes

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box width={"1100px"} mt={2} height={"400px"}>
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
