import { atom } from "recoil";

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface RideProps {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  options: Array<Driver>;
  duration: string;
  originAddress: string;
  destinationAddress: string;
  customerId: string;
}

const ridesAtom = atom({
  key: "RECOIL_KEY_RIDES",
  default: {
    origin: {
      latitude: 0,
      longitude: 0,
    },
    destination: {
      latitude: 0,
      longitude: 0,
    },
  } as RideProps,
});

export { ridesAtom };
