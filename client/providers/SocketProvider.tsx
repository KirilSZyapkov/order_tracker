"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const updateShipment = useAppStore((state) => state.updateShipment);



  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
      transports: ['websocket'],
    });

    socket.on("connect", () => {
      console.log("🟢 socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 socket disconnected");
    });


    socket.on("shipment:update", (shipment) => {
      toast.success(`Shipment ${shipment.orderNumber} updated`);
      updateShipment(shipment.id, shipment);
    });

    return () => {
      socket.disconnect();
    }
  }, [updateShipment])

  return <>{children}</>;
}