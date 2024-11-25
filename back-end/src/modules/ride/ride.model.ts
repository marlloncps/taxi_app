import connection from "../../database/db";
import { RideProps } from "./entity/ride-entity";

class RideModel {
  async getRidesByCustomerId(customer_id: string): Promise<RideProps[]> {
    const query = `SELECT * FROM rides WHERE customer_id = ${customer_id} ORDER BY created_at DESC`;
    try {
      const [rows] = await connection.query(query);
      return rows as RideProps[];
    } catch (error) {
      console.error("Erro ao buscar corridas no banco de dados", error);
      throw Error("Erro ao buscar corridas no banco de dados");
    }
  }
}
export default new RideModel();
