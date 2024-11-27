import { Request, Response } from "express";
import driversService from "./drivers.service";

class DriverController {
  async getAllDrivers(req: Request, res: Response) {
    try {
      const drivers = await driversService.getAllDrivers();
      res.status(200).send({ drivers });
      return;
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
      res.status(500).send({ message: "Erro ao buscar motoristas no sistema" });
      return;
    }
  }
}

export default new DriverController();
