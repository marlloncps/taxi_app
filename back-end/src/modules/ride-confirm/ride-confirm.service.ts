import driversService from "../drivers/drivers-service";

export interface ConfirmRideProps {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

class RideConfirmService {
  async confirmRide({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  }: ConfirmRideProps) {
    const driverResponse = await driversService.getDriverById(driver.id);
    if (!driverResponse)
      return { status: 404, message: "Motorista não encontrado" };

    if (
      driverResponse.min_quilometers &&
      distance < driverResponse.min_quilometers
    ) {
      return {
        status: 406,
        message: "Quilometragem inválida para o motorista",
      };
    }
    return { status: 200, message: "Viagem confirmada com sucesso" };
  }
}

export default new RideConfirmService();
