import driversModel from "../drivers/drivers-model";

class DriversService {
  async getDriversByDistance(distance: number) {
    const response = await driversModel.getDriversByDistance(distance);
    return response
  }
}

export default new DriversService();
