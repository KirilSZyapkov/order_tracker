import {Router} from "express";
import {
  createNewUser,
  getUserById
} from "../controllers/user.controller";

const router = Router();

router.get("/:userId", getUserById);
router.post("/", createNewUser);

// router.delete("/:shipmentId", updateShipment);

export default router;
