// pages/dashboard.js
import Head from 'next/head';
import DashboardNavbar from '@/components/DashboardNavbar';
import { useAuth } from '@/hooks/useAuth';
import VentasSummaryChart from '@/components/VentasSummaryChart';
import BeneficioNetoChart from '@/components/BeneficioNetoChart';
import GastosChart from '@/components/GastosChart';

export default function Dashboard() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <p>Acceso denegado</p>;
  }

  return (
    <div>
      <Head>
        <title>Dashboard - AutoFactura</title>
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Container for charts */}
        <div className="flex flex-wrap -mx-4 text-center">
          {/* Column for each chart */}
          <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow">
              <VentasSummaryChart />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow">
              <GastosChart />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <BeneficioNetoChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
