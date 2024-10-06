import type { Product } from '@prisma/client';
import { Button } from '../ui/button';
import { Link } from 'react-router';

type Props = {
  product: Product;
};

export const Card = ({ product }: Props) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        src="https://placedog.net/500/500?r"
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <Button className="bg-gray-800 text-white" asChild>
          <Link to={product.id}>{product.price.d[0]}</Link>
        </Button>
      </div>
    </div>
  );
};
