import { Request, Response } from "express";
import rideConfirmService from "./ride-confirm.service";
import rideConfirmVerifyParams from "../../utils/ride-confirm-verify";
import { ErrosCodeResponseEnum } from "../../utils/enums";

class RideConfirmController {
  constructor() {
    this.confirmRide = this.confirmRide.bind(this);
    this.sendErrorResponse = this.sendErrorResponse.bind(this);
  }
  private sendErrorResponse(
    res: Response,
    status: number,
    errorCode: ErrosCodeResponseEnum,
    errorDescription: string
  ) {
    return res.status(status).send({
      error_code: errorCode,
      error_description: errorDescription,
    });
  }
  async confirmRide(req: Request, res: Response) {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body;

    const { status: verifyStatus, message: verifyMessage } =
      rideConfirmVerifyParams({
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
      });

    if (verifyStatus === 400) {
      return this.sendErrorResponse(
        res,
        verifyStatus,
        ErrosCodeResponseEnum.InvalidData,
        verifyMessage ?? ""
      );
    }

    try {
      const { status, message } = await rideConfirmService.confirmRide({
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
      });

      if (status !== 200) {
        const errorMap = {
          404: ErrosCodeResponseEnum.DriverNotFound,
          406: ErrosCodeResponseEnum.InvalidDistance,
        } as const;

        return this.sendErrorResponse(
          res,
          status,
          errorMap[status as keyof typeof errorMap],
          message
        );
      }

      return res.status(200).send({ success: true });
    } catch (error) {
      console.error("Erro ao confirmar viagem:", error);
      return this.sendErrorResponse(
        res,
        500,
        ErrosCodeResponseEnum.InternalServerError,
        "Erro interno ao processar a solicitação."
      );
    }
  }
}

export default new RideConfirmController();
