import { prisma } from '~/.server/db/prisma';

export const getInvoices = () => {
  return prisma.invoice.findMany({
    include: {
      product: true,
    },
  });
};
