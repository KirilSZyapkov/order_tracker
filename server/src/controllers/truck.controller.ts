import { Request, Response } from "express";
import { db } from "../db/prisma";

export async function getAllTrucks(req: Request, res: Response) {
  const { organizationName } = req.query;

  if (!organizationName) {
    return res.status(400).json({ error: "Organization name is required" });
  };
  try {
    const trucks = await db.truck.findMany({
      where: { organizationName: String(organizationName) }
    });

    res.status(200).json(trucks);

  } catch (e: unknown) {
    console.error("Error fetching trucks:", e);
    res.status(500).json({ error: "Failed to fetch trucks" });
  }
}

export async function getTruckById(req: Request, res: Response) {
  const { truckId } = req.params;
  const { organizationName } = req.query;

  if (!truckId) {
    return res.status(400).json({ error: "Truck ID is required" });
  };

  try {
    const truck = await db.truck.findFirst({
      where: {
        id: truckId,
        organizationName: String(organizationName)
      }
    });

    res.status(200).json(truck);
  } catch (e: unknown) {
    console.error("Error fetching truck by ID:", e);
    res.status(500).json({ error: "Failed to fetch truck" });
  }
}

export async function createNewTruck(req: Request, res: Response) {
  const truckData = req.body;

  try {
    const newTruck = await db.truck.create({
      data: {
        plateNumber: truckData.plateNumber,
        organizationName: truckData.organizationName,
      }
    });

    res.status(201).json(newTruck);
  } catch (e: unknown) {
    console.error("Error creating new truck:", e);
    res.status(500).json({ error: "Failed to create new truck" });
  }
}