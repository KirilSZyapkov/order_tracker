import { Router } from "express";
import {
  getAllShipments,
  updateShipmentById,
  createShipment,
  getShipmentById,
  getAssignedShipmentByTruckId,
  getUserShipments,
  deleteShipmentById
} from "../controllers/shipment.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", requireAuth(),getAllShipments);
router.get("/assigned/:truckId", requireAuth(), getAssignedShipmentByTruckId);
router.get("/:shipmentId", requireAuth(), getShipmentById);
router.get("/list/:userId/:organizationName", requireAuth(), getUserShipments);
router.post("/", requireAuth(), createShipment);
router.put("/:shipmentId", requireAuth(), updateShipmentById);
router.delete("/:shipmentId/:userId/:organizationName", requireAuth(), deleteShipmentById);

export default router;
