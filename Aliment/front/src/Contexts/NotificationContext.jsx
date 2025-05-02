import { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const NotificationContext = createContext(undefined);

// Hook personnalisé pour utiliser le contexte
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

// Provider de notification
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Charger les notifications au démarrage
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Notifications par défaut pour la démo
      const defaultNotifications = [
        {
          id: '1',
          title: 'Rappel de médicament',
          message: 'N\'oubliez pas de prendre votre Metformine à 8h00.',
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: '2',
          title: 'Alerte nutritionnelle',
          message: 'Votre consommation de sodium est élevée aujourd\'hui.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: true
        }
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
    }
  }, []);

  // Sauvegarder les notifications lorsqu'elles changent
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Ajouter une notification
  const addNotification = (notification) => {
    const newNotification = {
      id: notification.id || Date.now().toString(),
      title: notification.title,
      message: notification.message,
      timestamp: notification.timestamp,
      read: notification.read
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Supprimer une notification
  const removeNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  // Supprimer toutes les notifications
  const clearAll = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}