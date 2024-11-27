import { Router } from "express";
import RideEstimateRouter from "../modules/ride-estimate/ride-estimate.router";
import RideConfirmRouter from "../modules/ride-confirm/ride-confirm.router";
import RideRouter from "../modules/ride/ride.router";
import DriversRouter from "../modules/drivers/drivers.router";

const router = Router();

router.use("/ride/estimate", RideEstimateRouter);
router.use("/ride/confirm", RideConfirmRouter);
router.use("/ride", RideRouter);
router.use("/drivers", DriversRouter);

export default router;
