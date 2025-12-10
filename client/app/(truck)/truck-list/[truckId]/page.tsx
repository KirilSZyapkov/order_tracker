"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/store";
import { useConfirmDelivery } from "@/hooks/useConfirmDelivery";
import { ShipmentCard } from "@/components/shared/shipmentCard";
import { ConfirmDialog } from "@/components/shared/confirmDialog";
import { useShipmentsSync } from "@/hooks/useShipmentsSync";
import { ShipmentType } from "@/types/shipmentType";


export default function DriverPage() {

  const params = useParams();
  useShipmentsSync(params);

  const shipments = useAppStore((s) => s.shipments);
  const [selected, setSelected] = useState<ShipmentType | null>(null);
  const { confirm } = useConfirmDelivery();

  if(shipments.lenght === 0){
    return (
      <div>
        <p>No shipments for delivery</p>
      </div>
    )
  }

  return (
    // да адаптирам с Шадцсиен Card
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Дeliveries</h1>

      <div className="space-y-3">
        {shipments.map(s => (
          <ShipmentCard key={s.id} shipment={s} onClick={() => setSelected(s)} />
        ))}
      </div>

      <ConfirmDialog open={!!selected} title="Mark as delivered?" onConfirm={() => { confirm(selected.id, selected); setSelected(null); }} onCancel={() => setSelected(null)} />
    </main>
  );
}
