import connection from "../../database/db";

class RideEstimateModel {
  async getDriversByDistance(distance: number) {
    const query = "SELECT * FROM drivers WHERE min_quilometers >= ?";
    try {
      const [rows] = await connection.query(query, [distance]);
      return rows;
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
      throw new Error("Erro ao buscar motoristas no banco de dados.");
    }
  }
}

export default new RideEstimateModel();
