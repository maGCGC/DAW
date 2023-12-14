import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../src/hooks/useAuth';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GastosChart = () => {
  const [gastosData, setGastosData] = useState();
  const { auth } = useAuth();
  const [totalGastos, setTotalGastos] = useState(0);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gastos/por-cliente', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Datos recibidos para gastos:", data);

          // Calcular la suma total de gastos y configurar el gráfico
          let total = 0;
          const labels = [];
          const montos = [];
          const backgroundColors = [];

          data.forEach((gasto, index) => {
            total += parseFloat(gasto.monto);
            labels.push(gasto.nombreCliente);
            montos.push(parseFloat(gasto.monto));
            backgroundColors.push(`hsl(${index * 360 / data.length}, 70%, 50%)`);
          });

          setTotalGastos(total.toFixed(2));

          setGastosData({
            labels: labels,
            datasets: [{
              data: montos,
              backgroundColor: backgroundColors,
              hoverOffset: 4
            }]
          });
        } else {
          const errorText = await response.text();
          throw new Error(`Error en la respuesta de la API: ${errorText}`);
        }
      } catch (error) {
        console.error("Error al obtener el resumen de gastos:", error);
      }
    };

    if (auth.token) {
      fetchGastos();
    }
  }, [auth.token]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Total de Gastos: ${totalGastos} €`,
      },
      legend: {
        position: 'bottom'
      }
    },
  };

  if (!gastosData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Gastos por Cliente</h3>
      <Doughnut data={gastosData} options={options} />
    </div>
  );
};

export default GastosChart;
