import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-xl font-bold">Logo</div>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/products" className="hover:text-gray-300">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/invoices" className="hover:text-gray-300">
              Mis facturas
            </Link>
          </li>
          <li>
            <Link to="/subscriptions" className="hover:text-gray-300">
              Mis suscripciones
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-gray-300">
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
