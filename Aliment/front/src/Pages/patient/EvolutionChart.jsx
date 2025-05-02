import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function EvolutionChart() {
  // Exemple de données sur 7 jours
  const data = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Calories consommées",
        data: [1800, 1700, 1900, 1600, 2000, 1750, 1850],
        fill: false,
        borderColor: "#16a34a",
        backgroundColor: "#16a34a",
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2">Évolution des calories sur 7 jours</h2>
      <Line data={data} options={options} height={120} />
    </div>
  );
}