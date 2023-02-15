import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const UserData = createTRPCRouter({
  getUserData: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
  deleteUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.delete({
        where: {
          email: input.email,
        },
      });
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          name: input.name,
          image: input.image,
        },
      });
    }),
  setUserAdmin: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          isAdministrator: true,
        },
      });
    }),
  setUserNotAdmin: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          isAdministrator: false,
        },
      });
    }),
});
