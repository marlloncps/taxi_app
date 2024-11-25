export interface RideProps {
  id: 2;
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string };
  value: number;
  created_at: string;
}
