import { Router } from "express";
import rideController from "./ride.controller";

const router = Router();

router.get("/:customer_id", rideController.getRideByCustomerId);

export default router;
