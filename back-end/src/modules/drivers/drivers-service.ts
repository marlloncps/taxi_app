import driversModel from "../drivers/drivers-model";

class DriversService {
  async getDriversByDistance(distance: number) {
    const response = await driversModel.getDriversByDistance(distance);

    response.forEach((driver) => {
      delete driver.min_quilometers;
    });

    return response;
  }

  async getDriverById(id: number) {
    const response = await driversModel.getDriverById(id);
    return response;
  }
}

export default new DriversService();
