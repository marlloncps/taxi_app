import { Router } from "express";
import RideEstimateRouter from "../modules/ride-estimate/ride-estimate.router";
import RideConfirmRouter from "../modules/ride-confirm/ride-confirm.router";

const router = Router();

router.use("/ride/estimate", RideEstimateRouter);
router.use("/ride/confirm", RideConfirmRouter);

export default router;
