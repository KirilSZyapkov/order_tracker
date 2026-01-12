
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";
import { apiFetch } from "@/lib/utils";
import { ShipmentType } from "@/types/shipmentType";


type Options = {
  truckId?: string;
  organizationName?: string;
}

export function useShipmentsSync(opts?: Options) {
  const setShipments = useAppStore((s) => s.setShipments);
  console.log("useShipmentSync 17 - ", opts?.truckId);
  const isTruckMode = Boolean(opts?.truckId);
  console.log("useShipmentSync 19 - ", isTruckMode);

  const query = useQuery<ShipmentType[] | null>({

    queryKey: isTruckMode
    ?[opts?.truckId]
    :[opts?.organizationName],

    enabled: isTruckMode ? Boolean(opts?.truckId) : Boolean(opts?.organizationName),

    queryFn: async ():Promise<ShipmentType[] | null>=>{
      let url: string = "";

      if(isTruckMode){
        url = `/api/shipments/assigned/${opts?.truckId}?status=inTransit`;
      } else {
        url = `/api/shipments?organizationName=${opts?.organizationName}`;
      }

      const listData = await apiFetch<ShipmentType[]>(url,{ method: "GET" });

      return listData;
    }
 })
  const { data, isError, isLoading, refetch } = query;

  useEffect(() => {
    if (data) {
      setShipments(data);
    } else {
      setShipments([]);
    }
  }, [data, setShipments]);  

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load shipments");
    }
  }, [isError]);

  return { isLoading, refetch };
}