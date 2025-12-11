"use client";

export default function truckShipmentCard() {
  function onClick() {

  };

  const shipment = {
    clientName: "",
    deliveryAddress: "",
    phone:"",
    loadingDay:""
  }
  return (
    <article className="p-4 rounded-xl shadow-sm border cursor-pointer" onClick={onClick}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-semibold">{shipment.clientName}</h3>
          <p className="text-xs text-muted-foreground">{shipment.deliveryAddress}</p>
        </div>
        <div className="text-right">
          <p className="text-xs">{shipment.phone}</p>
          <p className="text-xs text-muted-foreground">{shipment.loadingDay ?? ""}</p>
        </div>
      </div>
    </article>
  );
}