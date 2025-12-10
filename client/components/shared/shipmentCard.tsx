"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShipmentType } from "@/types/shipmentType";

export function ShipmentCard({ shipment, onClick }: { shipment: ShipmentType; onClick?: () => void }) {
  return (
    <Card className="p-4 rounded-xl shadow-sm border cursor-pointer" onClick={onClick}>
      <CardHeader>
      <div className="flex justify-between">
        <div>
          <CardTitle><h3 className="text-sm font-semibold">{shipment.clientName}</h3></CardTitle>
          <p className="text-xs text-muted-foreground">{shipment.deliveryAddress}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-right">
          <p className="text-xs">{shipment.phone}</p>
          <p className="text-xs text-muted-foreground">{shipment.loadingDay ?? ""}</p>
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
