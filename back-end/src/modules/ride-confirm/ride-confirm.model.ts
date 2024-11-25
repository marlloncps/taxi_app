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

    const connectionInstance = await connection.getConnection();
    try {
      await connectionInstance.beginTransaction();

      const [rows] = await connectionInstance.query(query, [
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
      ]);

      await connectionInstance.commit();
      return rows;
    } catch (error) {
      await connectionInstance.rollback();
      console.error("Erro ao confirmar viagem:", error);
      throw new Error("Erro ao salvar viagem no banco de dados.");
    } finally {
      connectionInstance.release();
    }
  }
}

export default new RideConfirmModel();
