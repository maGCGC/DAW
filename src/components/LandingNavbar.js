import Link from "next/link";

const LandingNavbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-semibold text-gray-700 cursor-pointer">
              AutoFactura
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/login">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Iniciar sesión
              </span>
            </Link>
            <Link href="/register">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Registro
              </span>
            </Link>
            <a
              href="mailto:support@autofactura.es"
              className="text-gray-600 hover:text-gray-900"
            >
              Soporte
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Tu email"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
            <Link href="/register">
              <span className="bg-green-500 hover:bg-green-600 text-white text-sm rounded-md px-4 py-2 cursor-pointer">
                Empieza gratis
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
