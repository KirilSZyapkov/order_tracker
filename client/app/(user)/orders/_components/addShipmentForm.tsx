"use client";

import {useState} from "react";
import {useAppStore} from "@/store/store";
import {Input} from "@/components/ui/input";
import {NewShipmentFormType} from "@/types/form_types/newShipmentFormType";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {useShipmentsSync} from "@/hooks/useShipmentsSync";
import {apiFetch} from "@/lib/utils";
import {ShipmentType} from "@/types/shipmentType"
import {formatDateForUI} from "@/lib/utils";

const initialData = {
  orderNumber: "",
  clientName: "",
  deliveryAddress: "",
  deliveryDay: "",
  phone: "",
  gpsCoordinates: "",
}

export default function AddShipmentForm() {
  const [formData, setFormData] = useState<NewShipmentFormType>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addShipments = useAppStore((state) => state.addShipment);
  const user = useAppStore((state) => state.user);

  console.log("orders/addShipmentForm 27", formData);


  async function onSubmitNewShipment(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.clientName || !formData.deliveryAddress || !formData.orderNumber || !formData.deliveryDay || !formData.phone || !user) {
      toast.error("Please fill out all fields.");
      return;
    }
    ;

    const newRawData = {
      orderNumber: formData.orderNumber.trim(),
      clientName: formData.clientName.trim(),
      deliveryAddress: formData.deliveryAddress.trim(),
      deliveryDay: formatDateForUI(formData.deliveryDay),
      phone: formData.phone.trim(),
      gpsCoordinates: formData.gpsCoordinates,
      autherId: user.id,
      organizationName: user.organizationName,
      truckId: "",
      truckNumber: "",
      actualDeliveryDay: "",
      deliveryTime: "",
      recipientName: "",
      status: "pending",
    };

    const newOrder = await apiFetch<ShipmentType>('/api/shipments',
      {
        method: "POST",
        body: JSON.stringify(newRawData)
      },

      "Failed to create the shipment"
    );

    if (newOrder) {
      addShipments(newOrder);
      setFormData(initialData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }


  }

  return (
    <form
      onSubmit={onSubmitNewShipment}
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
              setFormData((prev) => ({...prev, orderNumber: e.target.value}))
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
              setFormData((prev) => ({...prev, clientName: e.target.value}))
            }
          />
        </div>

        {/* Delivery Day */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Delivery Day</label>
          <Input
            type="date"
            placeholder="Enter delivery day in format: 01.01"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.deliveryDay}
            onChange={(e) =>
              setFormData((prev) => ({...prev, deliveryDay: e.target.value}))
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
              setFormData((prev) => ({...prev, phone: e.target.value}))
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
              setFormData((prev) => ({...prev, deliveryAddress: e.target.value}))
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
              setFormData((prev) => ({...prev, gpsCoordinates: e.target.value}))
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
        {false ? (
          <Loader2 className="w-4 h-4 animate-spin"/>
        ) : (
          "Create Shipment"
        )}
      </Button>
    </form>


  )
}