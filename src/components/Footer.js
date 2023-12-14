// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p>© {new Date().getFullYear()} AutoFactura. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Política de Privacidad</a>
            <a href="#" className="hover:underline">Términos de Servicio</a>
            <a href="#" className="hover:underline">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
