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

    try {
      const { data: RoutesData } = await mapsModel.getRoute({
        origin,
        destination,
      });

      if (!RoutesData?.routes || +RoutesData.routes.length === 0) {
        res.status(404).send({
          message:
            "Não foi possível encontrar rotas disponíveis para essas localizações.",
        });
        return;
      }

      const route = RoutesData.routes[0];

      if (!route.distanceMeters) {
        res.status(500).send({
          message: "Erro ao calcular a distância da rota. Dados incompletos.",
        });
        return;
      }

      const distance = (route.distanceMeters / 1000).toFixed(2);

      const drivers = await driversService.getDriversByDistance(+distance);

      res.status(200).send({
        message: "Estimativa calculada com sucesso",
        route,
        drivers,
      });
    } catch (error) {
      console.error("Erro ao calcular estimativa de rota:", error);
      res.status(500).send({
        message:
          "Erro interno ao calcular estimativa de rota. Tente novamente mais tarde.",
      });
    }
  }
}

export default new RideEstimateController();
