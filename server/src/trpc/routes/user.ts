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
            id: input.clerkId,
            email: input.email,
            firstName: input.firstName,
            secondName: input.secondName,
            phone: input.phone,
            organizationName: input.organizationName,
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