import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { createNewUserInput } from '../../types/trpcInputTypes/types';

export const userRouter = router({
  createNewUser: publicProcedure
    .input(createNewUserInput)
    .mutation(async({ ctx, input })=> {
      try {
        const newUser = await ctx.db.user.create({
          data:{
            clerkId: input.clerkId,
            firstName: input.firstName,
            secondName: input.secondName,
            email: input.email,
            phone: input.phone,
            shipments: input.shipments,
            role: input.role
          }
        });
        return newUser;
      } catch (e: unknown) {
        console.error("Error creating user:", e);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create user',
        });
      }
})
})