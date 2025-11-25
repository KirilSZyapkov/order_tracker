import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const shipmentsRouter = router({
  // Get all shipments
  getAllShipments: publicProcedure.query(async ({ ctx }) => {
    try {
      const shipments = await ctx.db.shipment.findMany();
      if(shipments.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No shipments found',
        });
      }
      return shipments;
    } catch (e: unknown) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch shipments',
      });
    }
  })
});