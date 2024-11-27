import { atom } from "recoil";

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
  options: Array<unknown>;
  duration: string;
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
