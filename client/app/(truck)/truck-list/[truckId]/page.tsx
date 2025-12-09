"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/store";
import { useConfirmDelivery } from "@/hooks/useConfirmDelivery";
import { ShipmentCard } from "@/components/shared/shipmentCard";
import { ConfirmDialog } from "@/components/shared/confirmDialog";
import { useShipmentsSync } from "@/hooks/useShipmentsSync";


export default function DriverPage() {
  // да заредя truckId от парамс
  const params = useParams();
  // const truckId = params.truckId;
  useShipmentsSync(params);
  console.log(params);
  
  // For demo assume truckId from user metadata or query param

  const shipments = useAppStore((s) => s.shipments);
  const [selected, setSelected] = useState<any | null>(null);
  const { confirm } = useConfirmDelivery();

  return (
    // да адаптирам с Шадцсиен Card
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Driver deliveries</h1>

      <div className="space-y-3">
        {shipments.map(s => (
          <ShipmentCard key={s.id} shipment={s} onClick={() => setSelected(s)} />
        ))}
      </div>

      <ConfirmDialog open={!!selected} title="Mark as delivered?" onConfirm={() => { confirm(selected.id, selected); setSelected(null); }} onCancel={() => setSelected(null)} />
    </main>
  );
}
