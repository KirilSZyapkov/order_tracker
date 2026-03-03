"use client";

import { apiFetch } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { useState, useEffect } from "react";
import { ShipmentType } from "@/types/shipmentType";


export default function UserPage() {
  const curUser = useAppStore((state) => state.user);
  const isUserLoaded = useAppStore((state) => state.isUserLoaded);
  const [shipments, setShipments] = useState<ShipmentType[]>([]);

  useEffect(() => {
    async function fetch() {
      if (curUser) {
        const response = await apiFetch<ShipmentType[]>(`/api/shipments/list/${curUser?.id}/${curUser?.organizationName}`);
        if (response) {
          setShipments(response);
        } 
      }
    }
    fetch();
  }, [curUser]);

  if (!isUserLoaded) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-2xl py-3">Loading user data...</h1>
      </div>
    )
  };

  console.log("user, 40", shipments);
  

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {curUser?.id}</p>
    </div>
  );
}