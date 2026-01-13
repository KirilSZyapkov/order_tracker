"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";
import {ShipmentType} from "@/types/shipmentType";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const updateShipment = useAppStore((state) => state.updateShipment);



  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000", {
      transports: ['websocket'],
    });

    socket.on("connect", () => {
      console.log("🟢 socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 socket disconnected");
    });


    socket.on("shipment:update", (shipment: ShipmentType) => {
      const status = shipment.status;

      switch (status) {
        case "inTransit":{
          toast.success(`Shipment ${shipment.orderNumber} updated`);
        }
        break;
        case "delivered":
        case "delayed":{
          toast.success(`Shipment ${shipment.orderNumber} delivered`);
        }
        break;
      }
      updateShipment(shipment.id, shipment);
    });

    return () => {
      socket.disconnect();
    }
  }, [updateShipment])

  return <>{children}</>;
}