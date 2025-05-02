import { useEffect, useState } from 'react';
import { Calendar, Info, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UserDashboard() {
  const { user } = useAuth();
  const { addNotification } = useNotification();

  // Exemple de données nutritionnelles
  const [nutritionData] = useState({
    calories: 1200,
    protein: 60,
    carbs: 150,
    fat: 40,
    target: {
      calories: 2000,
      protein: 100,
      carbs: 250,
      fat: 70,
    },
  });

  // Exemple de rappels de médicaments
  const [medications, setMedications] = useState([
    { id: '1', name: 'Metformine', time: '08:00', status: 'taken' },
    { id: '2', name: 'Insuline', time: '12:30', status: 'pending' },
    { id: '3', name: 'Aspirine', time: '20:00', status: 'pending' },
  ]);

  const [alerts] = useState([
    "Attention: Votre consommation de sodium est élevée aujourd'hui.",
    "Rappel: N'oubliez pas de prendre votre médicament à 12h30.",
  ]);

  // Données pour le graphique d'évolution
  const chartData = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Calories',
        data: [1800, 1650, 1900, 1700, 1600, 1200, 1500],
        borderColor: 'rgb(74, 222, 128)',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.3,
        borderWidth: 2,
        pointBackgroundColor: 'rgb(74, 222, 128)',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          stepSize: 200
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Simuler la prise de médicament
  const handleMedicationTaken = (id) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, status: 'taken' } : med
      )
    );
    addNotification({
      id: Date.now().toString(),
      title: 'Médicament pris',
      message: 'Vous avez marqué un médicament comme pris.',
      timestamp: new Date().toISOString(),
      read: false,
    });
  };

  // Simuler les notifications de médicaments
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      medications.forEach(med => {
        if (med.status === 'pending' && med.time === currentTime) {
          addNotification({
            id: Date.now().toString(),
            title: 'Rappel de médicament',
            message: `Il est temps de prendre votre ${med.name}.`,
            timestamp: new Date().toISOString(),
            read: false,
          });
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [medications, addNotification]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-lg text-gray-600 mt-2">
              Bienvenue, <span className="font-medium text-blue-600">{user?.name}</span>. Voici votre résumé du jour.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
        </div>

        {/* Alertes */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{alert}</p>
              </div>
            ))}
          </div>
        )}

        {/* Résumé nutritionnel */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(nutritionData).filter(([key]) => key !== 'target').map(([key, value]) => (
            <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{key}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {value}
                    <span className="text-base font-normal text-gray-500 ml-1">
                      / {nutritionData.target[key]} {key === 'calories' ? 'kcal' : 'g'}
                    </span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.min(100, (value / nutritionData.target[key]) * 100)}%`,
                        backgroundColor: (value / nutritionData.target[key]) < 0.5 ? '#ef4444' : 
                                        (value / nutritionData.target[key]) < 0.8 ? '#f59e0b' : '#10b981'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    (value / nutritionData.target[key]) < 0.5 ? 'bg-red-100 text-red-800' : 
                    (value / nutritionData.target[key]) < 0.8 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {Math.round((value / nutritionData.target[key]) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rappels de médicaments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Rappels de médication</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {medications.map(med => (
              <div key={med.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    med.status === 'taken' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {med.status === 'taken' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{med.name}</h3>
                    <p className="text-sm text-gray-500">À prendre à {med.time}</p>
                  </div>
                </div>
                {med.status === "pending" && (
                  <button 
                    onClick={() => handleMedicationTaken(med.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Marquer comme pris
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Graphique d'évolution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Évolution nutritionnelle</h2>
            <p className="text-sm text-gray-500 mt-1">Votre consommation de calories sur 7 jours</p>
          </div>
          <div className="p-6 h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}