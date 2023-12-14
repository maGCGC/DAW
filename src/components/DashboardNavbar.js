// src/components/DashboardNavbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const DashboardNavbar = () => {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-6 max-w-2xl mx-auto ">
      <Link href="/dashboard" passHref>
        <Image
          src="/assets/images/logoautofacturablue.png"
          alt="Logo"
          width={100} // Establecer el ancho de la imagen
          height={40} // Establecer la altura de la imagen
          className="h-8 cursor-pointer"
        />
      </Link>
      <div>
        {auth.isAuthenticated && (
          <>
            <Link href="/dashboard" passHref>
              <span className="p-2 cursor-pointer">Inicio</span>
            </Link>
            <Link href="/clientes" passHref>
              <span className="p-2 cursor-pointer">Clientes</span>
            </Link>
            <Link href="/ventas" passHref>
              <span className="p-2 cursor-pointer">Ventas</span>
            </Link>
            <Link href="/compras" passHref>
              <span className="p-2 cursor-pointer">Compras</span>
            </Link>
            <button onClick={handleLogout} className="p-2">
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
