import driversModel from "./drivers.model";

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

  async getAllDrivers() {
    const response = await driversModel.getAllDrivers();
    return response;
  }
}

export default new DriversService();
