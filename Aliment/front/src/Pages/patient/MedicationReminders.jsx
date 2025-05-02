import React, { useState } from "react";

const initialReminders = [
  { id: 1, medicine: "Paracétamol", time: "08:00", status: "À prendre" },
  { id: 2, medicine: "Insuline", time: "12:00", status: "Pris" }
];

export default function MedicationReminders() {
  const [reminders, setReminders] = useState(initialReminders);

  const markAsTaken = id => {
    setReminders(reminders =>
      reminders.map(r =>
        r.id === id ? { ...r, status: "Pris" } : r
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Rappels de Médication</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Médicament</th>
              <th className="py-2 px-4 border-b">Heure</th>
              <th className="py-2 px-4 border-b">Statut</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map(reminder => (
              <tr key={reminder.id}>
                <td className="py-2 px-4 border-b">{reminder.medicine}</td>
                <td className="py-2 px-4 border-b">{reminder.time}</td>
                <td className="py-2 px-4 border-b">
                  <span className={reminder.status === "Pris" ? "text-green-600" : "text-red-600"}>
                    {reminder.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {reminder.status === "À prendre" && (
                    <button
                      onClick={() => markAsTaken(reminder.id)}
                      className="bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700"
                    >
                      Marquer comme pris
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}