import { prisma } from '~/.server/db/prisma';
import type { CreateOrderDto } from './dtos/create-order.dto';

export const findOrderById = async (id: string) => {
  return prisma.order.findFirst({
    where: {
      product_id: id,
    },
  });
};

export const createOrder = async (createOrderDto: CreateOrderDto) => {
  return prisma.order.create({
    data: {
      email: createOrderDto.email!,
      product_id: createOrderDto.product_id,
      price: createOrderDto.price,
    },
  });
};
