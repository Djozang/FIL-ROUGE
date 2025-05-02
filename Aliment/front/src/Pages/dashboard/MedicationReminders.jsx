import { useState, useEffect } from 'react';
import { Bell, Clock, Plus, Check, X, Calendar, Trash2 } from 'lucide-react';

export default function MedicationReminders() {
  const [medications, setMedications] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: '08:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    active: true
  });
  const [takenMedications, setTakenMedications] = useState({});
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  // Charger les médicaments au démarrage
  useEffect(() => {
    const storedMedications = localStorage.getItem('medications');
    if (storedMedications) {
      setMedications(JSON.parse(storedMedications));
    } else {
      // Médicaments par défaut pour la démo
      const defaultMedications = [
        {
          id: '1',
          name: 'Metformine',
          dosage: '500mg',
          frequency: 'daily',
          time: '08:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          active: true
        },
        {
          id: '2',
          name: 'Insuline',
          dosage: '10 unités',
          frequency: 'daily',
          time: '12:30',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          active: true
        },
        {
          id: '3',
          name: 'Aspirine',
          dosage: '100mg',
          frequency: 'daily',
          time: '20:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          active: true
        }
      ];
      setMedications(defaultMedications);
      localStorage.setItem('medications', JSON.stringify(defaultMedications));
    }

    // Initialiser les médicaments pris pour aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    const storedTakenMedications = localStorage.getItem(`takenMedications_${today}`);
    if (storedTakenMedications) {
      setTakenMedications(JSON.parse(storedTakenMedications));
    }
  }, []);

  // Sauvegarder les médicaments lorsqu'ils changent
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  // Sauvegarder les médicaments pris
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`takenMedications_${today}`, JSON.stringify(takenMedications));
  }, [takenMedications]);

  // Gestion des toasts
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Ajouter un nouveau médicament
  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      setToast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        type: "error"
      });
      return;
    }

    const medication = {
      ...newMedication,
      id: Date.now().toString()
    };

    setMedications([...medications, medication]);
    setShowAddDialog(false);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: '08:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      active: true
    });

    setToast({
      title: "Médicament ajouté",
      description: `${medication.name} a été ajouté à vos rappels.`,
      type: "success"
    });
  };

  // Supprimer un médicament
  const deleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
    setToast({
      title: "Médicament supprimé",
      description: "Le médicament a été supprimé de vos rappels.",
      type: "success"
    });
  };

  // Activer/désactiver un médicament
  const toggleMedicationActive = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, active: !med.active } : med
    ));
  };

  // Marquer un médicament comme pris
  const markAsTaken = (id) => {
    setTakenMedications({
      ...takenMedications,
      [id]: true
    });

    const medication = medications.find(med => med.id === id);
    if (medication) {
      setToast({
        title: "Médicament pris",
        description: `${medication.name} a été marqué comme pris.`,
        type: "success"
      });
    }
  };

  // Annuler la prise d'un médicament
  const markAsNotTaken = (id) => {
    const newTakenMedications = { ...takenMedications };
    delete newTakenMedications[id];
    setTakenMedications(newTakenMedications);
  };

  // Vérifier si un médicament a été pris
  const isMedicationTaken = (id) => {
    return !!takenMedications[id];
  };

  // Obtenir les médicaments pour aujourd'hui
  const getTodayMedications = () => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    return medications.filter(med => 
      med.active && (med.frequency === 'daily' || med.days.includes(dayOfWeek))
    );
  };

  // Formater l'heure
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}h${minutes}`;
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
          toast.type === 'error' ? 'bg-red-100 border-red-200 text-red-800' : 'bg-green-100 border-green-200 text-green-800'
        } border`}>
          <div className="font-bold">{toast.title}</div>
          <div>{toast.description}</div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Rappels de médicaments</h1>
          <p className="text-gray-500">
            Gérez vos médicaments et recevez des rappels pour ne jamais oublier une prise.
          </p>
        </div>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un médicament
        </button>
      </div>

      {/* Add Medication Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Ajouter un médicament</h2>
              <p className="text-gray-500">
                Ajoutez les détails de votre médicament pour recevoir des rappels.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du médicament</label>
                <input
                  type="text"
                  placeholder="Ex: Metformine"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                <input
                  type="text"
                  placeholder="Ex: 500mg"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence</label>
                <select
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="daily">Tous les jours</option>
                  <option value="weekly">Certains jours de la semaine</option>
                </select>
              </div>
              {newMedication.frequency === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jours de la semaine</label>
                  <div className="flex flex-wrap gap-2">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`px-3 py-1 text-sm rounded-md ${
                          newMedication.days.includes(day) 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                        onClick={() => {
                          const days = newMedication.days.includes(day)
                            ? newMedication.days.filter(d => d !== day)
                            : [...newMedication.days, day];
                          setNewMedication({ ...newMedication, days });
                        }}
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure de prise</label>
                <input
                  type="time"
                  value={newMedication.time}
                  onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={addMedication}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('today')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'today'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Aujourd'hui
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tous les médicaments
          </button>
        </nav>
      </div>

      {/* Today's Medications */}
      {activeTab === 'today' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-medium">Médicaments pour aujourd'hui</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="p-6">
            {getTodayMedications().length > 0 ? (
              <div className="space-y-4">
                {getTodayMedications().map((medication) => (
                  <div 
                    key={medication.id} 
                    className={`p-4 border rounded-lg flex justify-between items-center ${
                      isMedicationTaken(medication.id) ? 'bg-green-50 border-green-200' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium">{medication.name}</div>
                      <div className="text-sm text-gray-500">
                        {medication.dosage} - {formatTime(medication.time)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isMedicationTaken(medication.id) ? (
                        <>
                          <span className="text-green-600 text-sm font-medium">Pris</span>
                          <button 
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() => markAsNotTaken(medication.id)}
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </>
                      ) : (
                        <button 
                          className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                          onClick={() => markAsTaken(medication.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Marquer comme pris
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 border rounded-md bg-gray-50">
                <p className="text-gray-500">
                  Aucun médicament prévu pour aujourd'hui
                </p>
                <button 
                  className="mt-2 flex items-center mx-auto px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  onClick={() => setShowAddDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un médicament
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Medications */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium">Tous les médicaments</h2>
              <p className="text-sm text-gray-500 mt-1">
                Gérez tous vos médicaments et leurs rappels
              </p>
            </div>
            <div className="p-6">
              {medications.length > 0 ? (
                <div className="space-y-4">
                  {medications.map((medication) => (
                    <div 
                      key={medication.id} 
                      className={`p-4 border rounded-lg ${!medication.active ? 'bg-gray-50' : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{medication.name}</div>
                          <div className="text-sm text-gray-500">
                            {medication.dosage} - {formatTime(medication.time)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {medication.frequency === 'daily' 
                              ? 'Tous les jours' 
                              : `${medication.days.length} jours par semaine`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={medication.active}
                                onChange={() => toggleMedicationActive(medication.id)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <span className="text-sm text-gray-500">
                              {medication.active ? 'Actif' : 'Inactif'}
                            </span>
                          </div>
                          <button 
                            className="p-1 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700"
                            onClick={() => deleteMedication(medication.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border rounded-md bg-gray-50">
                  <p className="text-gray-500">
                    Aucun médicament enregistré
                  </p>
                  <button 
                    className="mt-2 flex items-center mx-auto px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                    onClick={() => setShowAddDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un médicament
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button 
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un médicament
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium">Paramètres de rappel</h2>
              <p className="text-sm text-gray-500 mt-1">
                Configurez vos préférences de notification
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notifications</label>
                    <p className="text-sm text-gray-500">
                      Recevoir des notifications pour les rappels de médicaments
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rappel anticipé</label>
                    <p className="text-sm text-gray-500">
                      Recevoir un rappel 15 minutes avant l'heure prévue
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rappel en cas d'oubli</label>
                    <p className="text-sm text-gray-500">
                      Recevoir un rappel si vous n'avez pas pris votre médicament
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}