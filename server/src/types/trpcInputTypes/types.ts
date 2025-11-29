import { z } from 'zod';

export const createNewShipmentInput = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  autherId: z.string().min(1, 'Author ID is required'),
  truckId: z.string().optional(),
  truckNumber: z.string().optional(),
  clientName: z.string().min(1, 'Client name is required'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  deliveryDay: z.string().min(1, 'Delivery day is required'),
  actualDeliveryDay: z.string().optional(),
  deliveryTime: z.string().optional(),
  phone: z.string().min(1, 'Phone is required'),
  gpsCoordinates: z.string().optional(),
  recipientName: z.string().optional(),
  status: z.enum(['pending', 'inTransit', 'delivered']).default('pending'),
  organizationName: z.string().min(1, 'Organization name is required'),
});

export type CreateNewShipmentInput = z.infer<typeof createNewShipmentInput>;

export const updateShipmentByIdInput = z.object({
  id: z.string(),
  orderNumber: z.string().optional(),
  autherId: z.string().optional(),
  truckId: z.string().optional(),
  truckNumber: z.string().optional(),
  clientName: z.string().optional(),
  deliveryAddress: z.string().optional(),
  deliveryDay: z.string().optional(),
  actualDeliveryDay: z.string().optional(),
  deliveryTime: z.string().optional(),
  phone: z.string().optional(),
  gpsCoordinates: z.string().optional(),
  recipientName: z.string().optional(),
  status: z.enum(['pending', 'inTransit', 'delivered']).optional(),
  organizationName: z.string().optional(),
  updatedAt: z.string().optional() // можеш да го махнеш ако го сетваш автоматично
});

export type UpdateShipmentByIdInput = z.infer<Partial<typeof updateShipmentByIdInput>>;

export const createNewUserInput = z.object({
  clerkId: z.string().min(1, 'ID is required'),
  email: z.string().min(1,'Email is required'),
  firstName: z.string().min(1, 'First name is required'),
  secondName: z.string().min(1, 'Second name is required'),
  phone: z.string().optional(),
  organizationName: z.string().min(1, 'Organization name is required'),
  role: z.enum(['admin', 'user']).default('user'),
});

export type CreateNewUserInput = z.infer<typeof createNewUserInput>;

export const createNewTruckInput = z.object({
  plateNumber: z.string().min(1, 'Plate number is required'),
  organizationName: z.string().min(1, 'Organization name is required'),
});

export type CreateNewTruckInput = z.infer<typeof createNewTruckInput>;