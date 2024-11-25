import { Router } from "express";
import rideConfirmController from "./ride-confirm.controller";

const router = Router();

router.patch("/", rideConfirmController.confirmRide);

export default router;
