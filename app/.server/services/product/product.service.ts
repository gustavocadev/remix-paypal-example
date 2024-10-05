import { prisma } from '~/.server/db/prisma';

// these are my controllers
export const getProducts = () => {
  return prisma.product.findMany();
};

export const findById = (id: string) => {
  // return productRepository
};
