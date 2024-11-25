import { Request, Response } from "express";
import { ErrosCodeResponseEnum } from "../../utils/enums";
import rideService from "./ride.service";

class RideController {
  async getRideByCustomerId(req: Request, res: Response) {
    const { customer_id } = req.params;
    const driver_id =
      typeof req.query.driver_id === "string" ? req.query.driver_id : undefined;

    if (!customer_id || customer_id.trim() === "" || isNaN(+customer_id)) {
      res.status(400).send({
        error_code: ErrosCodeResponseEnum.InvalidData,
        error_description: "Parâmetro customer_id inválido",
      });
      return;
    }

    const response = await rideService.getRidesByCustomerId({
      customer_id,
      driver_id,
    });

    if (response === null) {
      res.status(400).send({
        error_code: ErrosCodeResponseEnum.InvalidDriver,
        error_description: "Motorista inválido",
      });
      return;
    }

    if (response?.length === 0) {
      res.status(404).send({
        error_code: ErrosCodeResponseEnum.RidesNotFound,
        error_description: "Nenhum registro encontrado",
      });
    }
    res.status(200).send(response);
    return;
  }
}
export default new RideController();
