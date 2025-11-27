import { router,publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const truckRouter = router({
  getAllTrucks: publicProcedure.query(async ({ctx}) => {
    const userId = ctx.userId;
    if(!userId){
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      });
    };
    try {
      const trucks = await ctx.db.truck.findMany();
      if(trucks.length === 0){
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No trucks found',
        });
      };
      return trucks;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch trucks',
      });
    }
  }),
  getTruckById: publicProcedure
  .input(z.object({id:z.string()}))
  .query(async ({ctx, input})=>{
    const userId = ctx.userId;
    if(!userId){
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      });
    };
    const id = input.id;
    if(!id){
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Truck ID is required',
      });
    };
    try {
      const truck = await ctx.db.truck.findUnique({
        where: {id}
      });
      if(!truck){
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Truck with id ${id} not found`,
        });
      };
      return truck;
      
    } catch (e: unknown) {
      console.error("Error fetching truck by ID:", e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch truck',
      });
    }
  })
});