import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { createNewShipmentInput, updateShipmentByIdInput } from '../../types/trpcInputTypes/types';
import type { Shipment } from '@prisma/client';

export const shipmentRouter = router({
  // Get all shipments
  getAllShipments: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      });
    };
    try {
      const shipments = await ctx.db.shipment.findMany();
      if (shipments.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No shipments found',
        });
      };
      return shipments;
    } catch (e: unknown) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch shipments',
      });
    }
  }),
  getShipmentById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        });
      };
      const id = input.id;
      try {
        const shipment = await ctx.db.shipment.findUnique({
          where: { id }
        });
        if (!shipment) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Shipment with id ${id} not found`,
          });
        }
        return shipment;
      } catch (e: unknown) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch shipment',
        });
      };
    }),
  createNewShipment: publicProcedure
    .input(createNewShipmentInput)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        });
      };
      try {
        const newCreatedShipment = await ctx.db.shipment.create({
          data: {
            orderNumber: input.orderNumber,
            autherId: input.autherId,
            truckId: input.truckId,
            truckNumber: input.truckNumber,
            clientName: input.clientName,            
            deliveryAddress: input.deliveryAddress,            
            deliveryDay: input.deliveryDay,
            phone: input.phone,
            status: input.status,
            organizationName: input.organizationName,
          }
        });
        ctx.io?.emit('shipmentCreated', newCreatedShipment);
        return newCreatedShipment;
      } catch (e: unknown) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create shipment',
        });
      }
    }),
  updateShipmentById: publicProcedure
    .input(updateShipmentByIdInput)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        });
      };
      const { id, ...updateData } = input;
      try {
        if (!id) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Shipment ID is required for update',
          });
        }
        const updatedShipment = await ctx.db.shipment.update({
          where: { id },
          data: updateData
        });
        ctx.io?.emit('shipmentUpdated', updatedShipment);
        return updatedShipment;

      } catch (e: unknown) {
        console.error("Error updating shipment:", e);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update shipment',
        });
      }
    }),
  deleteShipmentById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        });
      };
      const id = input.id;
      try {
        const deletedShipment = await ctx.db.shipment.delete({
          where: { id }
        });
        ctx.io?.emit('shipmentDeleted', deletedShipment);
        return deletedShipment;
      } catch (e: unknown) {
        console.error("Error deleting shipment:", e);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete shipment',
        });
      }
    })
});