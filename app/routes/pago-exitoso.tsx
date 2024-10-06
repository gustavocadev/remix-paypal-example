import { Button } from '~/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

// todo: you can add the order details here
export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            ¡Pago exitoso!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="border-t border-b border-gray-200 py-4">
            <h3 className="text-lg font-medium text-gray-900">
              Detalles del pedido
            </h3>
            <dl className="mt-4 space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">
                  Número de orden
                </dt>
                <dd className="text-sm font-medium text-gray-900">#12345</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Fecha</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Total</dt>
                <dd className="text-sm font-medium text-gray-900">
                  $350.00 USD
                </dd>
              </div>
            </dl>
          </div>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/">Volver a la página principal</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/products">Seguir comprando</Link>
            </Button>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Si tienes alguna pregunta, por favor contacta a nuestro{' '}
            <a
              href="/support"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              servicio de atención al cliente
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
