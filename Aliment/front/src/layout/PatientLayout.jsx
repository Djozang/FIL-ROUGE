import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const patientLinks = [
  { to: "/dashboard", label: "Tableau de bord" },
  { to: "/userdashboardjournal", label: "Journal alimentaire" },
  { to: "/userdashboardmedications", label: "Rappels de médicaments" },
  { to: "/userdashboardrecommendations", label: "Recommandations" },
  { to: "/userdashboardchat", label: "Chat" },
  { to: "/userevolution", label: "Évolution" }
];

export default function PatientLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white shadow-lg hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-green-700">Espace Patient</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {patientLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-2 rounded transition 
                ${location.pathname === link.to ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700 hover:bg-green-50"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t text-sm text-gray-400">© {new Date().getFullYear()} AlimentCare</div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header mobile */}
        <header className="w-full bg-white shadow px-4 py-3 flex items-center justify-between md:hidden">
          <span className="font-bold text-green-700">Espace Patient</span>
        </header>
        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}