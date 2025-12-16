"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/store";
import { useConfirmDelivery } from "@/hooks/useConfirmDelivery";
import { ShipmentCard } from "@/components/shared/shipmentCard";
import { ConfirmDialog } from "@/components/shared/confirmDialog";
import { useShipmentsSync } from "@/hooks/useShipmentsSync";
import { ShipmentType } from "@/types/shipmentType";
import { isDelayed } from "@/lib/utils";

// Todo: да оправя изчистването на пратката от списъка след потвърждаване на доставка
export default function DriverPage() {

  const params = useParams();
  useShipmentsSync(params);

  const shipments = useAppStore((s) => s.shipments);
  const removeShipment = useAppStore((s) => s.removeShipment);
  // const [selected, setSelected] = useState<ShipmentType | null>(null);
  const { confirmDelivery } = useConfirmDelivery();

  if (shipments.length === 0) {
    return (
      <div>
        <p>No shipments for delivery</p>
      </div>
    )
  }

  async function onConfirmDelivery(shipment: ShipmentType) {
    const confirmed = confirm("Please confirm delivery for " + shipment.clientName);
    if (!confirmed) return;
    
    const id = shipment.id;
    const locale = navigator.language;
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
    confirmDelivery(id, data);
    removeShipment(id);
  }

  return (
    // да адаптирам с Шадцсиен Card
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Deliveries</h1>

      <div className="space-y-3">
        {shipments.map(s => (
          <ShipmentCard key={s.id} shipment={s} onClick={() => onConfirmDelivery(s)} />
        ))}
      </div>
      {/* Todo: за бъдещо доразвитие. Да се добави записване името на получателя в диалог прозореца onClick={() => setSelected(s)}*/}
      {/* <ConfirmDialog open={!!selected} title="Mark as delivered?" onConfirm={() => { confirm(selected.id, selected); setSelected(null); }} onCancel={() => setSelected(null)} /> */}
    </main>
  );
}
