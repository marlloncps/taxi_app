import { Router } from "express";
import RideEstimateRouter from "../modules/ride-estimate/ride-estimate.router";
import RideConfirmRouter from "../modules/ride-confirm/ride-confirm.router";
import RideRouter from "../modules/ride/ride.router";

const router = Router();

router.use("/ride/estimate", RideEstimateRouter);
router.use("/ride/confirm", RideConfirmRouter);
router.use("/ride", RideRouter)

export default router;
