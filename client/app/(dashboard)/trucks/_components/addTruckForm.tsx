"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useAppStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { NewTruckFormType } from "@/types/form_types/newTruckFormType";

export default function addTruckForm() {
  const [formData, setFormData] = useState<NewTruckFormType>({
    plateNumber: "",
  });

  const addTruck = useAppStore((state) => state.addTruck);
  const user = useAppStore((state)=> state.user)

  const createTruck = trpc.truck.createNewTruck.useMutation({
    onSuccess: async (newTruck) => {
      toast.success("Truck created successfully");
      addTruck(newTruck);
    },
    onError: () => {
      toast.error("❌ Failed to create user.");
    },
  })

  async function onSubmintNewShipment(e: React.FormEvent) {
    e.preventDefault();
    
    if(!formData.plateNumber) {
      toast.error("Please enter truck plates");
      return;
    };

    createTruck.mutate({
      plateNumber: formData.plateNumber,
      organizationName: user?.organizationName || "",
    })

  };

  // Todo: Да доразвия формата. Да добавя име на превозвача и контакти.
  return (
    <form
      onSubmit={onSubmintNewShipment}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-md w-full max-w-5xl mx-auto"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Create Truck
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Order Number */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Plate Number</label>
          <Input
            placeholder="Enter plate number"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={formData.plateNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, plateNumber: e.target.value }))
            }
          />
        </div>
      </div>
      {/* Submit button */}
      <Button
        type="submit"
        className="w-full rounded-lg py-3 text-base font-semibold"
        disabled={createTruck.isPending}
      >
        {createTruck.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Create Shipment"
        )}
      </Button>
    </form>


  )
}