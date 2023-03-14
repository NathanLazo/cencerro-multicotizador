import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const insuranceData = createTRPCRouter({
  addYear: publicProcedure
    .input(z.object({ year: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.year.findFirst({
        where: {
          year: input.year,
        },
      });
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Year already exists.",
        });
      }
      return await ctx.prisma.year.create({
        data: {
          year: input.year,
        },
      });
    }),
  addBrand: publicProcedure
    .input(z.object({ brand: z.string(), year: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.brand.findFirst({
        where: {
          brand: input.brand,
          year: {
            year: input.year,
          },
        },
      });
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Brand already exists.",
        });
      }
      return await ctx.prisma.brand.create({
        data: {
          brand: input.brand,
          year: {
            connect: {
              year: input.year,
            },
          },
        },
      });
    }),
  addModel: publicProcedure
    .input(z.object({ model: z.string(), brand: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.model.findFirst({
        where: {
          model: input.model,
          brand: {
            id: input.brand,
          },
        },
      });
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Model already exists.",
        });
      }
      return await ctx.prisma.model.create({
        data: {
          model: input.model,
          brand: {
            connect: {
              id: input.brand,
            },
          },
        },
      });
    }),
  addSubModel: publicProcedure
    .input(
      z.object({
        subModel: z.string(),
        model: z.string(),
        brand: z.string(),
        year: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.subModel.findFirst({
        where: {
          subModel: input.subModel,
          model: {
            id: input.model,
          },
        },
      });
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "SubModel already exists.",
        });
      }

      const brand = await ctx.prisma.brand.findFirst({
        where: {
          brand: input.brand,
          yearId: input.year,
        },
      });

      const model = await ctx.prisma.model.findFirst({
        where: {
          brandId: brand?.id,
          model: input.model,
        },
      });

      return await ctx.prisma.subModel.create({
        data: {
          subModel: input.subModel,
          model: {
            connect: {
              id: model?.id,
            },
          },
        },
      });
    }),
  getYears: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.year.findMany();
  }),
  getBrands: publicProcedure
    .input(z.object({ year: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.brand.findMany({
        where: {
          year: {
            year: input.year,
          },
        },
      });
    }),
  getAllBrands: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.brand.findMany();
  }),
  getModels: publicProcedure
    .input(z.object({ brand: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input?.brand) {
        return [];
      }
      return await ctx.prisma.model.findMany({
        where: {
          brand: {
            id: input.brand,
          },
        },
      });
    }),
  getAllModels: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.model.findMany();
  }),
  getSubModels: publicProcedure
    .input(z.object({ model: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input?.model) {
        return [];
      }
      return await ctx.prisma.subModel.findMany({
        where: {
          model: {
            id: input.model,
          },
        },
      });
    }),
});
