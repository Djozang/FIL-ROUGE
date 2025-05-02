import React from "react";

export default function PatientsList() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Liste des Patients</h1>
      <p className="mb-8 text-lg text-gray-700">
        Retrouvez ici tous les patients inscrits sur la plateforme. Vous pouvez rechercher, filtrer ou accéder à leur profil.
      </p>
      {/* Ici tu pourras ajouter la table des patients */}
    </div>
  );
}