// src/layout/layout.js
import { Fragment } from 'react';
import LandingNavbar from '../components/LandingNavbar';
import DashboardNavbar from '../components/DashboardNavbar'; // Asegúrate de importar DashboardNavbar
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth'; // Importa useAuth

const Layout = ({ children }) => {
  const { auth } = useAuth(); // Usa el hook useAuth para acceder al estado de autenticación

  return (
    <Fragment>
      {auth.isAuthenticated ? <DashboardNavbar /> : <LandingNavbar />}
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
