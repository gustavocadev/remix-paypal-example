import type { Product } from '@prisma/client';
import { Card } from '~/components/shared/card';

type Props = {
  products: Product[];
};

export const Products = ({ products }: Props) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Nuestros productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          if (product.is_subscription) return null;
          return <Card product={product} key={product.id} />;
        })}
      </div>
    </section>
  );
};
