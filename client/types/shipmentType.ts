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
  status: string
  organizationName: string
  createdAt: string
  updatedAt: string | null
}
