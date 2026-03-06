"use client";

import { useState } from "react";
import { useAppStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/utils";
import { ShipmentType } from "@/types/shipmentType"
import { formatDateForUI } from "@/lib/utils";
import { UserType } from "@/types/userType";
import { Dispatch, SetStateAction } from 'react';

function toDateInputValue(value: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const dotMatch = value.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (dotMatch) {
    const [, day, month, year] = dotMatch;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


type Props = {
  setIsEditModalOpen: (prop: boolean) => void;
  shipment: ShipmentType;
  user: UserType;
  setShipments: Dispatch<SetStateAction<ShipmentType[]>>;
}

export default function ModalEditOrderForm({ setIsEditModalOpen, shipment, user, setShipments }: Props) {
  const [formData, setFormData] = useState<ShipmentType>(() => ({
    ...shipment,
    deliveryDay: toDateInputValue(shipment.deliveryDay),
  }));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const updateShipment = useAppStore((state) => state.updateShipment);

  async function onSubmitNewShipment(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.clientName || !formData.deliveryAddress || !formData.orderNumber || !formData.deliveryDay || !formData.phone || !user) {
      toast.error("Please fill out all fields.");
      return;
    };

    const newRawData = {
      orderNumber: formData.orderNumber.trim(),
      clientName: formData.clientName.trim(),
      deliveryAddress: formData.deliveryAddress.trim(),
      deliveryDay: formatDateForUI(formData.deliveryDay),
      phone: formData.phone.trim(),
      gpsCoordinates: formData.gpsCoordinates,
      autherId: user.id,
      organizationName: user.organizationName,
      truckId: formData.truckId,
      truckNumber: formData.truckNumber,
      actualDeliveryDay: formData.actualDeliveryDay,
      deliveryTime: formData.deliveryTime,
      recipientName: formData.recipientName,
      status: formData.status,
    };

    const updateOrder = await apiFetch<ShipmentType>(`/api/shipments/${shipment?.id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRawData)
      },

      "Failed to create the shipment"
    );

    if (updateOrder) {
      updateShipment(shipment.id, updateOrder);
      setShipments(prev => prev.map(s => s.id === shipment.id ? updateOrder : s));
      setFormData({ ...updateOrder, deliveryDay: toDateInputValue(updateOrder.deliveryDay) });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }


  }

  return (
    <form
      onSubmit={onSubmitNewShipment}
      className="top-1/2 left-1/2 transform -translate-x-1/2 space-y-6 bg-white p-6 rounded-2xl shadow-xl w-full max-w-5xl absolute z-50 border-3 border-gray-300"
    >
      <X className="absolute right-3 top-3 cursor-pointer" onClick={() => setIsEditModalOpen(false)} />
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Edit Order {shipment.orderNumber}
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
            type="date"
            placeholder="Enter delivery day in format: 01.01"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.deliveryDay ?? ""}
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
            value={formData.gpsCoordinates || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gpsCoordinates: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full rounded-lg py-3 text-base font-semibold cursor-pointer"
      // disabled={createShipment.isPending}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Update Shipment"
        )}
      </Button>
    </form>


  )
}
