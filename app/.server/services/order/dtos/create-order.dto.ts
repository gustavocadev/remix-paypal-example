import type { Order } from '@prisma/client';

// todo: only partial the fields that are be null
export type CreateOrderDto = Partial<Omit<Order, 'id'>>;
