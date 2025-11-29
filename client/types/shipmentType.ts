export type ShipmentType = {
  id: String
  orderNumber: String
  autherId: String
  truckId?: String
  truckNumber?: String
  clientName: String
  deliveryAddress: String
  deliveryDay: String
  actualDeliveryDay?: String
  deliveryTime?: String
  phone: String
  gpsCoordinates?: String
  recipientName?: String
  status: String
  organizationName: String
  createdAt: String
  updatedAt: String
}
