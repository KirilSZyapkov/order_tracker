import { Router } from "express";
import {
  getAllTrucks,
  getTruckById,
  createNewTruck
} from "../controllers/truck.controller";

const router = Router();

router.get("/", getAllTrucks);
router.get("/:truckId", getTruckById);
router.post("/", createNewTruck);

// router.delete("/:shipmentId", updateShipment);

export default router;
