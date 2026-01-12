import { Request, Response } from "express";
import { db } from "../db/prisma";

export async function createNewUser(req:Request, res: Response){

  const userData = req.body;

  try {
    const newUser = await db.user.create({
       data: {
            id: userData.clerkId,
            email: userData.email,
            firstName: userData.firstName,
            secondName: userData.secondName,
            phone: userData.phone,
            organizationName: userData.organizationName,
            role: userData.role
          }
    });
    res.status(201).json(newUser);
  } catch (e: unknown) {
    console.error("Error creating user:", e);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  const {userId} = req.params;

  if(!userId){
    return res.status(400).json({ message: "User ID is required" });
  };
  console.log("GET USER ID:", req.params.userId);
  try {
    const user = await db.user.findFirst({
      where: { id: userId }
    });
    res.status(200).json(user);   
  } catch (e: unknown) {
    console.error("Error fetching user:", e);
    res.status(500).json({ message: "Server error" });
  }
}