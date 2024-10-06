import { prisma } from '~/.server/db/prisma';
import type { LoaderArgs } from './+types.paypal';
import { findOrderById } from '~/.server/services/order/order.service';

// my webhook
// todo: this API is not working
// here a I need to create a invoice
export const loader = async ({ request }: LoaderArgs) => {
  const webhookEvent = await request.json();
  const authAlgo = request.headers.get('Paypal-Auth-Algo');
  const certUrl = request.headers.get('Paypal-Cert-Url');
  const transmissionId = request.headers.get('Paypal-Transmission-Id');
  const transmissionSig = request.headers.get('Paypal-Transmission-Sig');
  const transmissionTime = request.headers.get('Paypal-Transmission-Time');
  const webhookId = '3KX99360AP9965833';

  const username = process.env.PAYPAL_CLIENT_ID;
  const password = process.env.PAYPAL_SECRET_KEY;
  const credentials = btoa(`${username}:${password}`);

  const resp = await fetch(
    'https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_time: transmissionTime,
        transmission_sig: transmissionSig,
        webhook_id: webhookId,
        webhook_event: webhookEvent,
      }),
    }
  );

  if (!resp.ok) {
    const errorBody = await resp.text();
    console.error('Error al verificar el webhook:', errorBody);
    return new Response('Paypal error', { status: 401 });
  }

  const data = await resp.json();

  if (data.verification_status !== 'SUCCESS') {
    return new Response('Paypal error', { status: 401 });
  }

  const customId = webhookEvent.resource.custom_id || webhookEvent.resource.id;
  if (!customId) {
    return new Response('Missing custom ID', { status: 400 });
  }

  const eventType = webhookEvent.event_type;

  switch (eventType) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      return await saleProduct(customId, webhookEvent);
    case 'PAYMENT.SALE.COMPLETED':
      return await saleSubscription(customId, webhookEvent);
    default:
      console.log(`Unhandled event type: ${eventType}`);
      return new Response('Event not handled', { status: 200 });
  }
};

// Function to handle product sale
async function saleProduct(customId: string, webhookEvent: any) {
  const order = await findOrderById(customId);
  if (!order) {
    return new Response('Order not found', { status: 404 });
  }

  // Validate that the received amount matches the order amount
  const receivedAmount = Number.parseFloat(webhookEvent.resource.amount.value);
  if (order.price.d[0] !== receivedAmount) {
    return new Response(
      `Received amount ${receivedAmount} does not match order amount ${order.price}`,
      { status: 400 }
    );
  }

  // Create the invoice in the database using Prisma
  const invoice = await prisma.invoice.create({
    data: {
      product_id: order.product_id,
      price: receivedAmount,
      email: order.email,
    },
  });

  return Response.json({
    success: true,
    invoice,
  });
}

// Function to handle subscription sale
async function saleSubscription(customId: string, webhookEvent: any) {
  const subscription = await findOrderById(customId);
  if (!subscription) {
    return new Response('Subscription not found', { status: 404 });
  }

  // Validate that the received amount matches the subscription amount
  const receivedAmount = Number.parseFloat(webhookEvent.resource.amount.value);
  if (subscription.price.d[0] !== receivedAmount) {
    return new Response(
      `Received amount ${receivedAmount} does not match subscription amount ${subscription.price}`,
      { status: 400 }
    );
  }

  // Create the invoice in the database using Prisma
  const invoice = await prisma.invoice.create({
    data: {
      subscription_id: subscription.id,
      price: receivedAmount,
      email: subscription.email,
    },
  });

  return Response.json({
    success: true,
    invoice,
  });
}
