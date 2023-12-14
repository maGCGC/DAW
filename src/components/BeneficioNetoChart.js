import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useAuth } from "@/hooks/useAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BeneficioNetoChart = () => {
  const [beneficioData, setBeneficioData] = useState();
  const [beneficioNeto, setBeneficioNeto] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchBeneficioNeto = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/gastos/comparativa",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (response.ok) {
          const { ingresos, gastos } = await response.json();
          const beneficio = ingresos - gastos;
          setBeneficioNeto(beneficio);
          console.log("Datos recibidos:", ingresos, gastos);
          setBeneficioData({
            labels: ["Ingresos", "Gastos"],
            datasets: [
              {
                label: "Beneficio Neto",
                data: [ingresos, gastos],
                backgroundColor: [
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          });
        } else {
          const errorText = await response.text();
          throw new Error(`Error en la respuesta de la API: ${errorText}`);
        }
      } catch (error) {
        console.error("Error al obtener la comparativa:", error);
      }
    };
    if (auth.token) {
      fetchBeneficioNeto();
    }
  }, [auth.token]);

  const beneficioTitle = `Beneficio Neto: ${
    beneficioNeto >= 0
      ? beneficioNeto.toFixed(2) + " €"
      : `(${Math.abs(beneficioNeto).toFixed(2)}) €`
  }`;

  const options = {
    indexAxis: 'y',
    plugins: {
      title: {
        display: true,
        text: beneficioTitle,
        color: beneficioNeto >= 0 ? "black" : "red",
      },
      legend: {
        display: false,
      },
    },
  };

  if (!beneficioData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Beneficio Neto</h3>
      <Bar data={beneficioData} options={options} />
    </div>
  );
};

export default BeneficioNetoChart;
