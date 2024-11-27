import connection from "../../database/db";
import Driver from "./entity/driver-entity";

class DriversModel {
  async getDriversByDistance(distance: number): Promise<Driver[]> {
    const query = "SELECT * FROM drivers WHERE ? >= min_quilometers";
    try {
      const [rows] = await connection.query(query, [distance]);
      return rows as Driver[];
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
      throw new Error("Erro ao buscar motoristas no banco de dados.");
    }
  }

  async getDriverById(id: number): Promise<Driver | null> {
    const query = "SELECT * FROM drivers WHERE ID = ?";
    try {
      const [rows] = await connection.query(query, [id]);

      if (!Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      const driver = rows[0];

      return driver as Driver;
    } catch (error) {
      console.error("Erro ao buscar motorista:", error);
      throw new Error("Erro ao buscar motorista no banco de dados.");
    }
  }

  async getAllDrivers(): Promise<Driver[] | undefined> {
    const query = "SELECT * FROM drivers";
    try {
      const [rows] = await connection.query(query);
      if (!Array.isArray(rows) || rows.length === 0) {
        return undefined;
      }
      return rows as Driver[];
    } catch (error) {
      console.error("Erro so buscar motoristas", error);
      throw new Error("Erro ao buscar motoristas no banco de dados");
    }
  }
}

export default new DriversModel();
