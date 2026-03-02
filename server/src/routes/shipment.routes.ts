import { Router } from "express";
import {
  getAllShipments,
  updateShipmentById,
  createShipment,
  getShipmentById,
  getAssignedShipmentByTruckId,
  getUserShipments
} from "../controllers/shipment.controller";

const router = Router();

router.get("/", getAllShipments);
router.get("/assigned/:truckId", getAssignedShipmentByTruckId);
router.get("/:shipmentId", getShipmentById);
router.get("/list/:userId/:organizationName", getUserShipments);
router.post("/", createShipment);
router.patch("/:shipmentId", updateShipmentById);
// router.delete("/:shipmentId", updateShipment);

export default router;
