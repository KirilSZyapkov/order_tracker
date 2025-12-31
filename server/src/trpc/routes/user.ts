import { router, publicProcedure } from '@acme/shared';
import { TRPCError } from '@trpc/server';
import { createNewUserInput } from '../../types/trpcInputTypes/types';

export const userRouter = router({
  createNewUser: publicProcedure
    .input(createNewUserInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const newUser = await ctx.db.user.create({
          data: {
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
    }),
  getUserById: publicProcedure
    .query(async ({ ctx }) => {
      const clerkId = ctx.userId;
      // if (!clerkId) {
      //   throw new TRPCError({
      //     code: 'NOT_FOUND',
      //     message: 'User not found',
      //   });
      // };
      try {
        const curUser = await ctx.db.user.findFirst({
          where: { id: "test_id" }
        });
        return curUser;
      } catch (e: unknown) {
        console.error("Error fetching user:", e);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user',
        });
      }
    })
})