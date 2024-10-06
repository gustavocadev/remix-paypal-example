import type { Product } from '@prisma/client';
import { prisma } from '~/.server/db/prisma';

// these are my controllers
export const getProducts = (): Promise<Product[]> => {
  return prisma.product.findMany();
};

export const getProductById = (id: string) => {
  return prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};
