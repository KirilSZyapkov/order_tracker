"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useAppStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { NewShipmentFormType } from "@/types/form_types/newShipmentFormType";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useShipmentsSync } from "@/hooks/useShipmentsSync";

const initialData = {
  orderNumber: "",
  clientName: "",
  deliveryAddress: "",
  deliveryDay: "",
  phone: "",
  gpsCoordinates: "",
}

type Test = typeof trpc

export default function addShipmentForm() {
  const [formData, setFormData] = useState<NewShipmentFormType>(initialData);
  
  const addShipments = useAppStore((state) => state.addShipment);
  const user = useAppStore((state) => state.user);
  
  console.log("orders", user);
  

  const createShipment = trpc.shipment.createNewShipment.useMutation({
    onSuccess: async (newShipments) => {
      toast.success("Shipment created successfully");
      addShipments(newShipments);
      setFormData(initialData);
    },
    onError: () => {
      toast.error("❌ Failed to create user.");
    },
  })

  async function onSubmintNewShipment(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.clientName || !formData.deliveryAddress || !formData.orderNumber || !formData.deliveryDay || !formData.phone || !user) {
      toast.error("Please fill out all fields.");
      return;
    };
   
    createShipment.mutate({
      ...formData,
      autherId: user.id,
      organizationName: user.organizationName,
      truckId: "",
      truckNumber: "",
      actualDeliveryDay: "",
      deliveryTime: "",
      recipientName: "",
      status: "pending",
    });

  }
  return (
    <form
      onSubmit={onSubmintNewShipment}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-md w-full max-w-5xl mx-auto"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Create Shipment
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Order Number */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Order</label>
          <Input
            placeholder="Enter order number"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.orderNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, orderNumber: e.target.value }))
            }
          />
        </div>

        {/* Client Name */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Client Name</label>
          <Input
            placeholder="Enter client name"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.clientName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, clientName: e.target.value }))
            }
          />
        </div>

        {/* Delivery Day */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Delivery Day</label>
          <Input
            placeholder="Enter delivery day"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.deliveryDay}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, deliveryDay: e.target.value }))
            }
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <Input
            placeholder="Enter phone number"
            type="number"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        {/* Delivery Address (full width across all 3 columns) */}
        <div className="flex flex-col space-y-1 sm:col-span-2 lg:col-span-3">
          <label className="text-sm font-medium text-gray-700">Delivery Address</label>
          <Input
            placeholder="Enter delivery address"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.deliveryAddress}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, deliveryAddress: e.target.value }))
            }
          />
        </div>

        {/* GPS Coordinates (full width across all 3 columns) */}
        <div className="flex flex-col space-y-1 sm:col-span-2 lg:col-span-3">
          <label className="text-sm font-medium text-gray-700">GPS Coordinates</label>
          <Input
            placeholder="Enter GPS coordinates"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.gpsCoordinates}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gpsCoordinates: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full rounded-lg py-3 text-base font-semibold"
        // disabled={createShipment.isPending}
      >
        {createShipment.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Create Shipment"
        )}
      </Button>
    </form>


  )
}