import { Router } from "express";
import rideEstimateController from "./ride-estimate.controller";

const router = Router();

router.post("/", rideEstimateController.rideCalculate);

export default router;
