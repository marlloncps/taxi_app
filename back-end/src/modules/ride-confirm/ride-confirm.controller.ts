import { Request, Response } from "express";
import rideConfirmService from "./ride-confirm.service";
import rideConfirmVerifyParams from "../../utils/ride-confirm-verify";
import { ErrosCodeResponseEnum } from "../../utils/enums";

class RideConfirmController {
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
    const { status, message } = await rideConfirmService.confirmRide({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    });
    console.log(status);
    if (verifyStatus === 400) {
      res
        .status(verifyStatus)
        .send({ error_code: ErrosCodeResponseEnum.InvalidData, error_description: verifyMessage });
      return;
    }

    if (status === 404) {
      res
        .status(status)
        .send({ error_code: ErrosCodeResponseEnum.DriverNotFound, error_description: message });
      return;
    }

    if (status === 406) {
      res
        .status(status)
        .send({ error_code: ErrosCodeResponseEnum.InvalidDistance, error_description: message });
      return;
    }

    res.status(200).send({ success: true });
    return;
  }
}
export default new RideConfirmController();
