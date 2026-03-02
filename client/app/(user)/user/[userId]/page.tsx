"use client";

import { apiFetch } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { useState, useEffect } from "react";

export default function UserPage() {
  const curUser = useAppStore((state) => state.user);
  const isUserLoaded = useAppStore((state) => state.isUserLoaded);
  const [shipments, setShipments] = useState([]);

  useEffect(()=>{
    if(!curUser) {
      const response = apiFetch("/api/shipments/list",{
        
      })
    }
  },[curUser])

  if(!isUserLoaded){
    return (
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-2xl py-3">Loading user data...</h1>
      </div>    
    )
  }

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {curUser?.id}</p>
    </div>
  );
}