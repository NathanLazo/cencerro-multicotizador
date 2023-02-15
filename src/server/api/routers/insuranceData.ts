import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const insuranceData = createTRPCRouter({
  addYear: publicProcedure
    .input(z.object({ year: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.years.create({
        data: {
          year: input.year,
        },
      });
    }),
});
