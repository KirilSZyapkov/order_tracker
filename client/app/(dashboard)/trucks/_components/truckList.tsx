"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/store";
import { trpc } from "@/utils/trpc";


export default function truckList() {
  const user = useAppStore((state) => state.user);
  const trucks = useAppStore((state) => state.trucks);
  const setTruck = useAppStore((state) => state.setTrucks);

  // Todo... да проверя за логнат юзър, ако няма да редиректна към логин форма!

  const { data } = trpc.truck.getAllTrucks.useQuery(
    { organizationName: user?.organizationName || "" },
    { enabled: Boolean(user?.organizationName) }
  );

  useEffect(() => {
    if (data) {
      setTruck(data);
    };
  }, [data])

  return (
    <>
      {trucks.length > 0
        ? <div>
          {trucks.map(t => (
            <div key={t.id}>{t.plateNumber}</div>
          ))}
        </div >
        : (<div>No trucks were found.</div>)
      }
    </>
  );
}