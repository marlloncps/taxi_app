import connection from "../../database/db";

interface PersistRideProps {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: string;
  value: number;
}

class RideConfirmModel {
  async persistRide({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  }: PersistRideProps) {
    const query =
      "INSERT INTO rides (customer_id, origin, destination, distance, duration, driver, value) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
      const [rows] = await connection.query(query, [
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
      ]);

      return rows;
    } catch (error) {
      console.error("Erro ao confirmar viagem:", error);
      throw new Error("Erro ao salvar viagem no banco de dados.");
    }
  }
}

export default new RideConfirmModel();
