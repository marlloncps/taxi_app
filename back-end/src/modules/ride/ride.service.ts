import rideModel from "./ride.model";

interface GetRideByCustomerIdProps {
  customer_id: string;
  driver_id?: string;
}

class RideService {
  async getRidesByCustomerId({
    customer_id,
    driver_id,
  }: GetRideByCustomerIdProps) {
    const rides = await rideModel.getRidesByCustomerId(customer_id);

    if (!rides || (Array.isArray(rides) && rides.length === 0)) return [];

    if (driver_id) {
      const filteredResponse = rides.filter(
        (item) => item.driver.id === +driver_id
      );
      return filteredResponse.length > 0 ? filteredResponse : null;
    }

    return rides;
  }
}

export default new RideService();
