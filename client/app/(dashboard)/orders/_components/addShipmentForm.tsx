"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useAppStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { NewShipmentFormType } from "@/types/form_types/newShipmentFormType";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function addShipmentForm() {
  const [formData, setFormData] = useState<NewShipmentFormType>({
    orderNumber: "",
    clientName: "",
    deliveryAddress: "",
    deliveryDay: "",
    phone: "",
    gpsCoordinates: "",
  });
  
  const addShipments = useAppStore((state)=> state.addShipment);

  const createShipment = trpc.shipment.createNewShipment.useMutation({
    onSuccess: async (newShipments) => {
      toast.success("Shipment created sucsesfuly");
      addShipments(newShipments);
    },
    onError: () => {
      toast.error("❌ Failed to create user.");
    },
  })

  async function onSubmintNewShipment(e: React.FormEvent) {
    e.preventDefault();
    console.log(e);

  }
  return (
    <form onSubmit={onSubmintNewShipment} className="space-y-5">
      {/* Order Number */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Order</label>
        <Input
          placeholder="Enter order number"
          value={formData.orderNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, orderNumber: e.target.value }))
          }
        />
      </div>
      {/* Client Name */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Client Name</label>
        <Input
          placeholder="Enter client name"
          value={formData.clientName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, clientName: e.target.value }))
          }
        />
      </div>

      {/* Delivery Address */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Delivery Address</label>
        <Input
          placeholder="Enter delivery address"
          value={formData.deliveryAddress}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, deliveryAddress: e.target.value }))
          }
        />
      </div>

      {/* Delivery Day */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Delivery Day</label>
        <Input
          placeholder="Enter delivery day"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, deliveryDay: e.target.value }))
          }
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">phone</label>
        <Input
          placeholder="Enter phone number"
          type="number"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>

      {/* GPS Coordinates */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">GPS Coordinates</label>
        <Input
          placeholder="Enter GPS Coordinates"
          value={formData.gpsCoordinates}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, gpsCoordinates: e.target.value }))
          }
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full"
        disabled={createShipment.isPending}
      >
        {createShipment.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Create User"
        )}
      </Button>
    </form>
  )
}