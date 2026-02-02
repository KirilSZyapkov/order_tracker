"use client";

import {useEffect} from "react";
import {useAppStore} from "@/store/store";

import {Card, CardContent} from "@/components/ui/card";
import {Files} from 'lucide-react';
import {Tooltip, TooltipContent, TooltipTrigger,} from "@/components/ui/tooltip"
import {apiFetch} from "@/lib/utils";
import {TruckType} from "@/types/truckType";
import {toast} from "sonner";

export default function TruckList() {
  const user = useAppStore((state) => state.user);
  const trucks = useAppStore((state) => state.trucks);
  const setTruck = useAppStore((state) => state.setTrucks);

  useEffect(() => {
    async function fetch() {
      const listTrucks = await apiFetch<TruckType[]>(`/api/trucks?organizationName=${user?.organizationName}`,
        {
          method: "GET"
        },
        "Failed to load trucks"
      );
      setTruck(listTrucks ?? []);
    };
    fetch();
  }, [user]);
  // Todo... да проверя за логнат юзър, ако няма да редиректна към логин форма!

  // Todo: да доразвия картичката. Да се изписва име на превозвача и контакти

  return (
    <>
      {trucks.length > 0
        ? <div className="grid grid-cols-1 gap-6">
          {trucks.map(t => (
            <Card key={t.id}>
              <CardContent className="flex justify-between items-center px-10">
                <div>{t.plateNumber}</div>
                <Tooltip>
                  <TooltipTrigger>
                    <Files className="cursor-pointer"
                           onClick={() => (navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/truck-list/${t.id}`), toast.success("Truck link copied to clipboard"))}/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy truck link</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          ))}
        </div>
        : (<h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">No trucks were found.</h2>)
      }
    </>
  );
}