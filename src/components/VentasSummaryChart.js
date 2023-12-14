import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../../src/hooks/useAuth';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes de Chart.js necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VentasSummaryChart = () => {
  const [chartData, setChartData] = useState();
  const { auth } = useAuth();
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    const fetchVentasSummary = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ventas/summary', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Datos recibidos:", data);

          // Calcular la suma total de ventas
          const total = Object.values(data).reduce((acc, value) => acc + parseFloat(value), 0);
          setTotalVentas(total.toFixed(2)); // Guardar la suma total en el estado

          setChartData({
            labels: ['Últimos 30 Días', 'Últimos 60 Días'],
            datasets: [{
              label: 'Total de Ventas',
              data: [
                parseFloat(data.totalUltimos30Dias),
                parseFloat(data.totalUltimos60Dias)
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          });
        } else {
          const errorText = await response.text();
          throw new Error(`Error en la respuesta de la API: ${errorText}`);
        }
      } catch (error) {
        console.error("Error al obtener el resumen de ventas:", error);
      }
    };

    if (auth.token) {
      fetchVentasSummary();
    }
  }, [auth.token]);

  // Opciones del gráfico para incluir el título con la suma total de ventas
  const options = {
    plugins: {
      title: {
        display: true,
        text: `Total de Ventas: ${totalVentas} €`, // Muestra el total de ventas en el título
      },
    },
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default VentasSummaryChart;
