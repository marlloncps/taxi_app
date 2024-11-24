import { Router } from "express";
import RideEstimateRouter from "../modules/ride-estimate/ride-estimate.router";

const router = Router();

router.use("/ride/estimate", RideEstimateRouter);

export default router;
