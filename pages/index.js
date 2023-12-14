// pages/index.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="bg-[#F0F4F8] flex-col min-h-screen">
      <Head>
        <title>AutoFactura: Gestión de Facturación Simplificada</title>
        <meta
          name="description"
          content="AutoFactura: La solución integral de facturación para autónomos y pequeñas empresas. Agiliza tus procesos, organiza tus cuentas y optimiza la gestión financiera de tu negocio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 my-4 mt-10">
          La Gestión de Facturación Nunca Fue Tan Fácil
          </h1>
          <p className="text-gray-600 text-4xl mt-10">
          Únete a miles de autónomos y empresas que confían en AutoFactura.
          </p>
          <div className="mt-10">
          <Link href="/register">
            <span className="bg-green-500 hover:bg-green-600 text-white text-sm rounded-md px-6 py-3 mr-4 mt-10">
              Empieza Gratis
            </span>
            </Link>
          </div>
          <div className="mt-10 flex justify-center">
          <Image
            src="/assets/images/hero.png"
            alt="Representative Image"
            width={500} // Establecer el ancho de la imagen
            height={300} // Establecer la altura de la imagen
            className="max-w-md"
          />
        </div>
        </div>
        <div className="py-20 bg-white mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              Soluciones Integrales para tu Negocio
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              
              <div className="p-6 mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Facturación Simplificada</h3>
                <p className="text-lg text-gray-600">Crea y envía facturas profesionales en minutos.</p>
              </div>
             
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
