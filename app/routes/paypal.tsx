import type { LoaderArgs } from './+types.paypal';

// my webhook
// todo: this API is not working
// here a I need to create a invoice
export const loader = async ({ request }: LoaderArgs) => {
  const body = await request.json();
  const authAlgo = request.headers.get('Paypal-Auth-Token');
  const certUrl = request.headers.get('Paypal-Cert-Url');
  const transmissionId = request.headers.get('Paypal-Transmission-Id');
  const transmissionSig = request.headers.get('Paypal-Transmission-Sig');
  const transmissionTime = request.headers.get('Paypal-Transmission-Time');
  const webhookEvent = body;
  const webhookId = '';

  const username = 'your-username';
  const password = 'your-password';
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');

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
      }),
    }
  );

  if (!resp.ok) {
    return new Response('Paypal error', { status: 401 });
  }

  const data = await resp.json();

  if (data.verification_status !== 'SUCCESS') {
    return new Response('Paypal error', { status: 401 });
  }

  return Response.json({
    success: true,
  });
};
