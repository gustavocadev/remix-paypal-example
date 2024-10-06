import { Outlet } from 'react-router';
import { Navbar } from '~/components/shared/navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
