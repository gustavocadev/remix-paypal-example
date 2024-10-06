import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export const routes: RouteConfig = [
  layout('routes/auth/layout.tsx', [
    index('./routes/home/index.tsx'),
    route(':productID', './routes/product.tsx'),
    route('invoices', './routes/invoices.tsx'),
    route('subscriptions', './routes/subscriptions.tsx'),
    route('pago-exitoso', './routes/pago-exitoso.tsx'),
  ]),

  route('paypal', './routes/paypal.tsx'),
  route('login', './routes/login.tsx'),
];
