
import {useEffect} from "react";
import {trpc} from "@/utils/trpc";
import {useAppStore} from "@/store/store";
import {toast} from "sonner";

export function useShipmentsSync(opts?:{truckId?: string}){
    const setShipments = useAppStore((s)=> s.setShipments);
    const {data, isError, refetch} = opts?.truckId
    ? trpc.shipment.getAssignedByTruck.useQuery({truckId: opts.truckId}, {enabled: true})
    : trpc.shipment.getAll.useQuery(undefined, {enabled: true});

    useEffect(()=>{
        if(data?.shipment){
            setShipments(data.shipment)
        }
    },[data, setShipments]);

    useEffect(() => {
    if (isError) {
      toast.error("Failed to load shipments");
    }
  }, [isError]);

  return refetch;
}