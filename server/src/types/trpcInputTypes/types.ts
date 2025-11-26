import {z} from 'zod';

export const createNewShipmentInput = z.object({
 orderNumber: z.string().min(1, 'Order number is required'),
 autherId: z.string().min(1, 'Author ID is required'),
 truckId: z.string().optional(),
 truckNumber: z.string().optional(),
 clientName   : z.string().min(1, 'Client name is required'),
 loadingAddress : z.string().min(1, 'Loading address is required'),
 deliveryAddress : z.string().min(1, 'Delivery address is required'),
 loadingDay : z.string().min(1, 'Loading day is required'),
 deliveryDay : z.string().min(1, 'Delivery day is required'),
 actualLoadingDay: z.string().optional(),
 actualDeliveryDay: z.string().optional(),
 deliveryTime: z.string().optional(),
 phone :z.string().min(1, 'Phone is required'),
 status : z.enum(['pending', 'inTransit', 'delivered']).default('pending'),
 gpsCoordinates :z.string().optional(),
 recipient :z.string().optional()
});

export type CreateNewShipmentInput = z.infer<typeof createNewShipmentInput>;