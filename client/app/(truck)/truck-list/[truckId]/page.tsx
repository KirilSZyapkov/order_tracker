"use client";

import { useState } from "react";
import {useParams} from "next/navigation";
import {useAppStore} from "@/store/store";
import {ShipmentCard} from "@/components/shared/shipmentCard";
import {ConfirmDialog} from "@/components/shared/confirmDialog";
import {useShipmentsSync} from "@/hooks/useShipmentsSync";
import {ShipmentType} from "@/types/shipmentType";
import {apiFetch, isDelayed} from "@/lib/utils";
import Loader from "@/components/shared/Loader";

export default function DriverPage() {
  const [shipment, setShipment] = useState<ShipmentType | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false);

  const setShipments = useAppStore((s) => s.setShipments);
  const params = useParams();
  useShipmentsSync(params);
  console.log("truck/truckId 17 - ", params);

  const shipments = useAppStore((s) => s.shipments);
  const removeShipment = useAppStore((s) => s.removeShipment);
  console.log("truck/truckId 22 - ", shipments);


  if (shipments.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-2xl py-3">No shipments for delivery</h1>
      </div>
    )
  }

  async function onConfirmDelivery(shipment: ShipmentType | null) {
    if(!shipment) return;

    // const confirmed = confirm("Please confirm delivery for " + shipment.clientName);
    // if (!confirmed) return;

    const previousStatus = [...shipments];
    const id = shipment.id;
    const locale = navigator.language;
    console.log("truck/truckId 32 - ", id);
    const actualDeliveryDay = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date());

    const deliveryTime = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());

    const delayed = isDelayed(shipment.deliveryDay);

    const data = {
      status: delayed ? "delayed" : "delivered",
      actualDeliveryDay,
      deliveryTime,
      updatedAt: new Date().toISOString(),
    };

    const updatedShipment = await apiFetch<ShipmentType>(`/api/shipments/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
      },
      "Failed to confirm delivery. Please try again."
    );

    if (updatedShipment) {
      removeShipment(id);
    } else {
      setShipments(previousStatus);
    }

  }



return (
  <main className="p-4">
    <h1 className="text-xl font-bold mb-4">Deliveries</h1>

    <div className="space-y-3">
      {shipments.map(s => (
        <ShipmentCard key={s.id} shipment={s} onClick={() => {setShipment(s); setOpenModal(true)}}/>
      ))}
    </div>
    {/* Todo: за бъдещо доразвитие. Да се добави записване името на получателя в диалог прозореца onClick={() => setSelected(s)}*/}
    <ConfirmDialog open={openModal} title="Confirm delivery!" onConfirm={() => onConfirmDelivery(shipment)} onCancel={() => setOpenModal(false)} />
  </main>
);
}
