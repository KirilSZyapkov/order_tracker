import { Request, Response } from "express";
import { db } from "../db/prisma";
import { io } from "../index";
import { Status } from "@prisma/client";

export async function getAllShipments(req: Request, res: Response) {
  const { organizationName } = req.query;
  console.log("shipment.controller", organizationName)
  try {
    const shipments = await db.shipment.findMany({
      where: { organizationName: String(organizationName) }
    });

    res.status(200).json(shipments);
  } catch (e: unknown) {
    console.error("Error fetching shipments:", e);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createShipment(req: Request, res: Response) {
  const shipmentData = req.body;
  try {
    const newCreatedShipment = await db.shipment.create({
      data: {
        orderNumber: shipmentData.orderNumber,
        autherId: shipmentData.autherId,
        truckId: shipmentData.truckId,
        truckNumber: shipmentData.truckNumber,
        clientName: shipmentData.clientName,
        deliveryAddress: shipmentData.deliveryAddress,
        deliveryDay: shipmentData.deliveryDay,
        actualDeliveryDay: shipmentData.actualDeliveryDay,
        deliveryTime: shipmentData.deliveryTime,
        phone: shipmentData.phone,
        gpsCoordinates: shipmentData.gpsCoordinates,
        recipientName: shipmentData.recipientName,
        status: shipmentData.status,
        organizationName: shipmentData.organizationName,
      }
    });

    io.emit('shipmentCreated', newCreatedShipment);
    res.status(201).json(newCreatedShipment);
  } catch (e: unknown) {
    console.error("Error creating shipment:", e);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAssignedShipmentByTruckId(req: Request, res: Response) {

  const { truckId } = req.params;
  const { status } = req.query;
  const shipmentStatus = typeof status === 'string' && Object.values(Status).includes(status as Status)
    ? (status as Status)
    : undefined;

  if (!truckId) {
    return res.status(400).json({ message: "Truck ID is required" });
  }

  try {
    const assignedShipments = await db.shipment.findMany({
      where: {
        truckId: String(truckId),
        status: shipmentStatus
      }
    })
    res.status(200).json(assignedShipments);
  } catch (e: unknown) {
    console.error("Error fetching assigned shipment:", e);
    res.status(500).json({ message: "Server error" });
  }

}

export async function getShipmentById(req: Request, res: Response) {
  const { shipmentId } = req.params;

  if (!shipmentId) {
    return res.status(400).json({ message: "Shipment ID is required" });
  }
  try {
    const shipment = await db.shipment.findFirst({
      where: { id: shipmentId }
    });
    res.status(200).json(shipment);
  } catch (e: unknown) {
    console.error("Error fetching shipment by ID:", e);
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateShipmentById(req: Request, res: Response) {
  const { shipmentId } = req.params;
  const updateData = req.body;

  if (!shipmentId) {
    return res.status(400).json({ message: "Shipment ID is required" });
  };

  try {
    const updatedShipment = await db.shipment.update({
      where: { id: shipmentId },
      data: updateData
    });

    io.emit("shipment:update", updatedShipment);
    res.status(200).json(updatedShipment);
  } catch (e: unknown) {
    console.error("Error updating shipment:", e);
    res.status(500).json({ message: "Server error" });
  }
}