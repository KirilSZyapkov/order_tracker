
import { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useAppStore } from "@/store/store";
import { toast } from "sonner";

export function useShipmentsSync(opts?: { truckId?: string, organizationName?: string }) {
  const setShipments = useAppStore((s) => s.setShipments);

  const isTruckMode = !!opts?.truckId;
  const query = isTruckMode
    ? trpc.shipment.getAssignedShipmentByTruckId.useQuery({ truckId: opts!.truckId!, status:"inTransit" }, { enabled: Boolean(opts?.truckId) })
    : trpc.shipment.getAllShipments.useQuery({ organizationName: opts!.organizationName! }, { enabled: Boolean(opts?.organizationName) });

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