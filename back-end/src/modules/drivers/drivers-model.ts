import connection from "../../database/db";
import Driver from "./entity/driver-entity";

class DriversModel {
  async getDriversByDistance(distance: number): Promise<Driver[]> {
    const query = "SELECT * FROM drivers WHERE min_quilometers >= ?";
    try {
      const [rows] = await connection.query(query, [distance]);
      return rows as Driver[];
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
      throw new Error("Erro ao buscar motoristas no banco de dados.");
    }
  }
}

export default new DriversModel();
