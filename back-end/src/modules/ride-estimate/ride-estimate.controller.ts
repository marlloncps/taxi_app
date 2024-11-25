import { Request, Response } from "express";
import driversService from "../drivers/drivers-service";
import rideEstimateVerifyParams from "../../utils/ride-estimate-verify";
import mapsModel from "../maps/maps.model";

class RideEstimateController {
  async rideCalculate(req: Request, res: Response): Promise<void> {
    const { origin, destination, customer_id } = req.body;

    const { status, message } = rideEstimateVerifyParams({
      origin,
      destination,
      customer_id,
    });

    if (status === 400) {
      res.status(status).send({ message });
      return;
    }

    const { data: RoutesData } = await mapsModel.getRoute({
      origin,
      destination,
    });
    const distance = (RoutesData.routes[0].distanceMeters / 1000).toFixed(2);
    const drivers = await driversService.getDriversByDistance(+distance);
    res.status(200).send({
      message: "Estimativa calculada com sucesso",
      route: RoutesData.routes[0],
      drivers,
    });
  }
}

export default new RideEstimateController();
