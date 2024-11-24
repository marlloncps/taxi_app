import rideEstimateModel from "./ride-estimate.model";

class RideEstimateService {
  async getDriversByDistance(distance: number) {
    const response = await rideEstimateModel.getDriversByDistance(distance);
    return response
  }
}

export default new RideEstimateService();
