import { Link } from 'react-router';
import { getInvoices } from '~/.server/services/invoice/invoice.service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import type * as Route from './+types.invoices';

export const loader = async () => {
  return {
    invoices: await getInvoices(),
  };
};

export default function Invoices({ loaderData }: Route.ComponentProps) {
  const { invoices } = loaderData;
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-end space-x-4">
          <Link to="/productos" className="hover:text-gray-300">
            Productos
          </Link>
          <Link to="/mis-facturas" className="hover:text-gray-300">
            Mis facturas
          </Link>
          <Link to="/mis-suscripciones" className="hover:text-gray-300">
            Mis suscripciones
          </Link>
          <Link to="/cerrar-sesion" className="hover:text-gray-300">
            Cerrar sesión
          </Link>
        </nav>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Mis facturas</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 text-white">
                <TableHead className="w-1/4">FECHA</TableHead>
                <TableHead className="w-2/4">PRODUCTO</TableHead>
                <TableHead className="w-1/8">PRECIO</TableHead>
                <TableHead className="w-1/8">TIPO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow
                  key={invoice.id}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <TableCell>
                    {new Date(invoice.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{invoice.product?.name}</TableCell>
                  <TableCell>{invoice.price}</TableCell>
                  <TableCell>
                    {invoice.is_product ? 'Subscription' : 'Producto'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
