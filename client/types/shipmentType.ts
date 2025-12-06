export type ShipmentType = {
  id: string
  orderNumber: string
  autherId: string
  truckId?: string
  truckNumber?: string
  clientName: string
  deliveryAddress: string
  deliveryDay: string
  actualDeliveryDay?: string
  deliveryTime?: string
  phone: string
  gpsCoordinates?: string
  recipientName?: string
  status: string
  organizationName: string
  createdAt: string
  updatedAt: string
}
