import type { MetaFunction } from 'react-router';
import { getProducts } from '~/.server/services/product/product.service';
import type * as Route from './+types.index';
import { Products } from './ui/products';
import { Banner } from './ui/banner';
import { Subscriptions } from '../home/ui/subscriptions';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const products = await getProducts();
  return { products };
};

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto my-8 px-4 space-y-8">
      <Banner />

      <Products products={loaderData.products} />
      <Subscriptions products={loaderData.products} />
    </main>
  );
}
