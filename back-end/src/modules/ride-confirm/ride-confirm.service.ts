import driversService from "../drivers/drivers-service";
import rideConfirmModel from "./ride-confirm.model";

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

    if (!driverResponse) {
      return {
        status: 404,
        message: "Motorista não encontrado",
      };
    }

    if (
      driverResponse.min_quilometers &&
      distance < driverResponse.min_quilometers
    ) {
      return {
        status: 406,
        message: `Quilometragem mínima para este motorista é de ${driverResponse.min_quilometers} km.`,
      };
    }

    try {
      const rideObject = {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver: JSON.stringify(driver),
        value,
      };

      await rideConfirmModel.persistRide(rideObject);

      return {
        status: 200,
        message: "Viagem confirmada com sucesso.",
      };
    } catch (error) {
      console.error("Erro ao confirmar viagem:", error);
      throw new Error("Erro interno ao confirmar viagem.");
    }
  }
}

export default new RideConfirmService();
