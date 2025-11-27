import { optional, z } from 'zod';

export const createNewShipmentInput = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  autherId: z.string().min(1, 'Author ID is required'),
  truckId: z.string().optional(),
  truckNumber: z.string().optional(),
  clientName: z.string().min(1, 'Client name is required'),
  loadingAddress: z.string().min(1, 'Loading address is required'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  loadingDay: z.string().min(1, 'Loading day is required'),
  deliveryDay: z.string().min(1, 'Delivery day is required'),
  actualLoadingDay: z.string().optional(),
  actualDeliveryDay: z.string().optional(),
  deliveryTime: z.string().optional(),
  phone: z.string().min(1, 'Phone is required'),
  status: z.enum(['pending', 'inTransit', 'delivered']).default('pending'),
  gpsCoordinates: z.string().optional(),
  recipient: z.string().optional()
});

export type CreateNewShipmentInput = z.infer<typeof createNewShipmentInput>;

export const updateShipmentByIdInput = z.object({
  id: z.string(),
  orderNumber: z.string().optional(),
  autherId: z.string().optional(),
  truckId: z.string().optional(),
  truckNumber: z.string().optional(),
  clientName: z.string().optional(),
  loadingAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  loadingDay: z.string().optional(),
  deliveryDay: z.string().optional(),
  actualLoadingDay: z.string().optional(),
  actualDeliveryDay: z.string().optional(),
  deliveryTime: z.string().optional(),
  phone: z.string().optional(),
  gpsCoordinates: z.string().optional(),
  recipient: z.string().optional(),

  status: z.enum(['pending', 'inTransit', 'delivered']).optional(),

  updatedAt: z.string().optional() // можеш да го махнеш ако го сетваш автоматично
});

export type UpdateShipmentByIdInput = z.infer<Partial<typeof updateShipmentByIdInput>>;

export const createNewUserInput = z.object({
  clerkId: z.string().min(1, 'Clerk ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  secondName: z.string().min(1, 'Second name is required'),
  email: z.string().min(1,'Email is required'),
  phone: z.string().optional(),
  shipments: z.array(z.string()).default([]),
  role: z.enum(['admin', 'user']).default('user'),
});

export type CreateNewUserInput = z.infer<typeof createNewUserInput>;