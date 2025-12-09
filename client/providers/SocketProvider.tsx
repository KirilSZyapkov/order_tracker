"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppStore } from "@/store/store";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const updateShipment = useAppStore((state) => state.updateShipment);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
      transports: ['websocket'],
    });

    socket.on("shipment:update", (shipment) => {
      updateShipment(shipment.id, shipment)
    });

    return ()=>{
      socket.disconnect();
    }
  }, [updateShipment])

  return <>{children}</>;
}