import { Button } from '~/components/ui/button';
import type * as Route from './+types.product';
import { getProductById } from '~/.server/services/product/product.service';
import {
  createOrder,
  findOrderById,
} from '~/.server/services/order/order.service';
import { Form, redirect, useNavigate } from 'react-router';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { toast } from 'sonner';

export const action = async ({ params }: Route.ActionArgs) => {
  const product = await getProductById(params.productID);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.is_subscription) {
    await createOrder({
      email: 'user1@test.com',
      product_id: params.productID,
      price: product?.price,
      is_subscription: true,
      // duration_months: product?.duration_months,
    });
  }
  if (!product.is_subscription) {
    await createOrder({
      email: 'user1@test.com',
      product_id: params.productID,
      price: product?.price,
      is_product: true,
    });
  }

  return redirect(`/product/${params.productID}`);
};

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProductById(params.productID);
  if (!product) {
    throw new Error('Product not found');
  }

  return {
    order: await findOrderById(params.productID),
    product,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  };
}

export default function Product({ params, loaderData }: Route.ComponentProps) {
  const nav = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src="https://placedog.net/500/500?r"
            alt="Escritorio ergonómico"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">Escritorio ergonómico</h1>
          <p className="text-gray-600">ID: {params.productID}</p>
          <p className="text-lg">Detalle: {loaderData.product.description}</p>
          <p className="text-2xl font-bold">
            Precio: {loaderData.product.price.d[0]} $
          </p>

          {loaderData.order ? (
            <p className="text-green-500 font-bold">
              <span className="font-bold">Id de la orden de compra:</span>{' '}
              {loaderData.order.id}
            </p>
          ) : (
            <Form method="post">
              <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                type="submit"
              >
                Comprar
              </Button>
            </Form>
          )}
          {loaderData.order && (
            <PayPalScriptProvider
              options={{
                clientId: loaderData.PAYPAL_CLIENT_ID ?? '',
                intent: loaderData.product.is_subscription
                  ? 'subscription'
                  : 'capture',
                vault: loaderData.product.is_subscription,
              }}
            >
              <PayPalButtons
                createOrder={
                  !loaderData.product.is_subscription
                    ? (_, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                currency_code: 'USD',
                                value:
                                  loaderData.product.price.d[0].toFixed(2) ??
                                  '0.00',
                              },
                              custom_id: loaderData.order?.id,
                            },
                          ],
                          intent: 'CAPTURE',
                        });
                      }
                    : undefined
                }
                createSubscription={
                  loaderData.product.is_subscription
                    ? (data, actions) => {
                        // https://www.sandbox.paypal.com/billing/plans
                        const subscriptionPlans = {
                          '12': 'P-4DM880836F451024DM4BNNWY',
                          '1': 'P-58Y06324KP1587219M4BNN3Q',
                        };
                        console.log(loaderData.product.duration_months);
                        return actions.subscription.create({
                          plan_id:
                            loaderData.product.duration_months === 12
                              ? subscriptionPlans['12']
                              : subscriptionPlans['1'],
                          custom_id: loaderData.order?.id,
                        });
                      }
                    : undefined
                }
                onApprove={async (data, actions) => {
                  if (loaderData.product.is_subscription) {
                    console.log(data);
                    nav('/pago-exitoso');
                    toast.success('Subscripcion Exitosa');
                    console.log('Subscripcion Exitosa');
                    return;
                  }

                  return actions.order?.capture().then((details) => {
                    console.log(details);
                    nav('/pago-exitoso');
                    toast.success('Compra Exitosa');
                    console.log('Compra Exitosa');
                  });
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
    </div>
  );
}
