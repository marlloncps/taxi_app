import { Router } from "express";
import driversController from "./drivers.controller";

const router = Router();

router.get("/", driversController.getAllDrivers);

export default router;
