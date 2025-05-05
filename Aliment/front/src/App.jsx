import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';


// Pages publiques
import HomePage from './pages/HomePage';
import ServicesPage from './Pages/Services';
import DiseasesPage from './Pages/Diseases';
import AdvicePage from './pages/Advice';
import { AdviceDetail } from './Pages/AdviceDetail';
import Accueil from './Pages/patient/accueil';//route dashboard


// Pages d'authentification
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './Pages/auth/RegisterPage';

// Dashboard utilisateur
// import UserDashboard from './pages/dashboard/UserDashboard';
import NutritionJournal from './Pages/dashboard/NutritionJournal';
import MedicationReminders from './Pages/dashboard/MedicationReminders';
import Recommendations from './Pages/dashboard/Recommendations';
import UserChat from './pages/dashboard/UserChat';

// Dashboard administrateur
import AdminDashboard from './pages/admin/AdminDashboard';
import PatientsList from './pages/admin/PatientsList';
import AlertsManagement from './pages/admin/AlertsManagement';
import RecommendationsManagement from './pages/admin/RecommendationsManagement';
import AdminChat from './pages/admin/AdminChat';


//Patient Layout
import UserDashboard from './Pages/dashboard/UserDashboard';

// Layouts
import DashboardLayout from './layout/PatientLayout';
import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';

// Protections des routes

import AdminRoute from './components/AdminRoute';
import PatientLayout from './layout/PatientLayout';

function App() {
  return (
        <NotificationProvider>
          <Routes>
            {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
            <Route element={<PublicLayout />}>
              <Route path="/accueil" element={<Accueil />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/diseases" element={<DiseasesPage />} />
              <Route path="/advice" element={<AdvicePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/advice/:disease" element={<AdviceDetail />} /> 
              {/* <Route path="/accueil" element={<accueil />} /> */}
            </Route>

            {/* Routes utilisateur protégées */}
            {<Route>
              <Route element={<DashboardLayout />}>
                {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
                <Route path="/dashboard/journal" element={<NutritionJournal />} />
                <Route path="/dashboard/medications" element={<MedicationReminders />} />
                <Route path="/dashboard/recommendations" element={<Recommendations />} />
                <Route path="/dashboard/chat" element={<UserChat />} />
              </Route>
            </Route> }

            {/* Routes administrateur protégées */}
            {<Route > 
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/adminpatients" element={<PatientsList />} />
                <Route path="/adminalerts" element={<AlertsManagement />} />
                <Route path="/adminrecommendations" element={<RecommendationsManagement />} />
                <Route path="/adminchat" element={<AdminChat />} />
              </Route>
            </Route> }

            {/* Routes patient protégées */}
            <Route>

              <Route element={<PatientLayout />} >

                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/userdashboardjournal" element={<NutritionJournal />} />
                <Route path="/userdashboardmedications" element={<MedicationReminders />} />
                <Route path="/userdashboardrecommendations" element={<Recommendations />} />
                <Route path="/userdashboardchat" element={<UserChat />} />
                <Route path="/userevolution" element={<UserDashboard />} />
              </Route>

            </Route>
            {/* <Route path="/path" element={<PatientLayout />} /> */}

          </Routes>
        
        </NotificationProvider>
  );
}

export default App;
