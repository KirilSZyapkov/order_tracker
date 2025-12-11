"use client";

import {useEffect} from "react";
import { useAppStore } from "@/store/store";
import { trpc } from "@/utils/trpc";


export default function truckList() {
  const user = useAppStore((state)=> state.user);
  const trucks = useAppStore((state)=> state.trucks);
  const setTruck = useAppStore((state)=> state.setTruck);

  // Todo... да проверя за логнат юзър, ако няма да редиректна към логин форма!

  const {data} = trpc.truck.getAllTrucks.useQuery(
    {organizationName: user?.organizationName || ""},
    {enabled: Boolean(user?.organizationName)}
  );

  useEffect(()=>{
    if (data) {
      setTruck(data);
    };
  },[data])
  
  return (
     {trucks.length > 0 
      ? (
        {trucks.map(t=>(
          <div>{t.plateNumber}</div>
        ))}
      ) 
      : (
        <div>No trucks</div>
      )}
  );
}