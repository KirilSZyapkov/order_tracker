export type ShipmentType = {
  id: string
  orderNumber: string
  autherId: string
  truckId: string | null
  truckNumber: string | null
  clientName: string
  deliveryAddress: string
  deliveryDay: string
  actualDeliveryDay: string | null
  deliveryTime: string | null
  phone: string
  gpsCoordinates: string | null
  recipientName: string | null
  status: "pending" | "inTransit" | "delivered" | "delayed"
  organizationName: string
  createdAt: string
  updatedAt: string | null
}

export type UpdateShipmentInput = {
  id: string;
  status?: "pending" | "inTransit" | "delivered" | "delayed";
  actualDeliveryDay?: string;
  deliveryTime?: string;
  truckNumber?: string;
  clientName?: string;
  deliveryAddress?: string;
  deliveryDay?: string;
  phone?: string;
  gpsCoordinates?: string;
  recipientName?: string;
  updatedAt?: string;
};
