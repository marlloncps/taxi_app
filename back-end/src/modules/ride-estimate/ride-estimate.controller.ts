import { Request, Response } from "express";
import rideEstimateService from "./ride-estimate.service";

class RideEstimateController {
  async rideCalculate(req: Request, res: Response): Promise<void> {
    const { origin, destination, customer_id } = req.body;
    console.log(origin, destination, customer_id);

    if (!origin || !destination || !customer_id) {
      res.status(400).send({
        message: "Endereço de origem, destino ou customer_id faltando",
      });
      return;
    }

    if (
      typeof origin !== "string" ||
      typeof destination !== "string" ||
      typeof customer_id !== "string" ||
      origin.trim() === "" ||
      destination.trim() === "" ||
      customer_id.trim() === ""
    ) {
      res.status(400).send({
        message:
          'O formato do corpo da requisição está inválido. O formato correto é: { "customer_id": "string", "origin": "string", "destination": "string" }',
      });
      return;
    }

    if (origin === destination) {
      res.status(400).send({ message: "Os endereços não podem ser iguais!" });
      return;
    }
    const drivers = await rideEstimateService.getDriversByDistance(5);
    console.log(drivers);
    res.status(200).send({ message: "Estimativa calculada com sucesso" });
  }
}

export default new RideEstimateController();
