import { PrismaClient } from '@prisma/client';

// Supongamos que tienes una instancia de Prisma Client llamada prisma
const prisma = new PrismaClient();

await prisma.product.createMany({
  data: [
    {
      id: '62f81202-10fa-4d90-8dec-bafd582ff854',
      name: 'Suscripción Mensual',
      description: 'Suscríbete y ten acceso a todo por un mes',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: true,
      duration_months: 1,
      price: 30,
    },
    {
      id: '42483d38-3483-41d5-ba98-46dc2d749bfd',
      name: 'Suscripción Anual',
      description: 'Suscríbete con acceso todo un año, ahorra 2 meses',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: true,
      duration_months: 12,
      price: 300,
    },
    {
      id: '66a55a1d-2e99-4423-90fc-d67a47bc792e',
      name: 'Teclado mecánico',
      description: 'Teclado mecánico ideal para programadores',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: false,
      price: 70,
    },
    {
      id: '10d20c7c-f861-4c0d-8e0f-e53c623412fd',
      name: 'Mouse inalámbrico',
      description: 'Mouse inalámbrico ideal para gamers',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: false,
      price: 35,
    },
    {
      id: '2bc2de91-3bfc-4e49-ad1b-2a211943cb76',
      name: 'Monitor 4k',
      description: 'Monitor 4k ideal para gamers y programadores',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: false,
      price: 300,
    },
    {
      id: '0b719332-8464-4618-b868-580d4dd58144',
      name: 'Escritorio ergonómico',
      description: 'Escritorio con altura configurable',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: false,
      price: 350,
    },
    {
      id: 'b94deaad-e6d-422b-b2cd-0b9e967bc9d2',
      name: 'Suscripción Mensual',
      description: 'Suscríbete y ten acceso a todo por un mes',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: true,
      duration_months: 1,
      price: 30,
    },
    {
      id: '95ca9edc-c9eb-405c-bd0c-b1f3c16399ec',
      name: 'Suscripción Anual',
      description: 'Suscríbete con acceso todo un año, ahorra 2 meses',
      image_url: 'https://picsum.photos/seed/picsum/200/300',
      is_subscription: true,
      duration_months: 12,
      price: 300,
    },
  ],
});
