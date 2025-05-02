import api from '../config/axios';

export const patientService = {
    getAllPatients: async () => {
        const response = await api.get('/patients');
        return response.data;
    },

    getPatientById: async (id) => {
        const response = await api.get(`/patients/${id}`);
        return response.data;
    },

    updatePatient: async (id, data) => {
        const response = await api.put(`/patients/${id}`, data);
        return response.data;
    },

    deletePatient: async (id) => {
        const response = await api.delete(`/patients/${id}`);
        return response.data;
    },

    getPatientMedications: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/medications`);
        return response.data;
    },

    addMedication: async (patientId, data) => {
        const response = await api.post(`/patients/${patientId}/medications`, data);
        return response.data;
    },

    updateMedication: async (medicationId, data) => {
        const response = await api.put(`/medications/${medicationId}`, data);
        return response.data;
    },

    deleteMedication: async (medicationId) => {
        const response = await api.delete(`/medications/${medicationId}`);
        return response.data;
    },

    getPatientFoodEntries: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/food-entries`);
        return response.data;
    },

    addFoodEntry: async (patientId, data) => {
        const response = await api.post(`/patients/${patientId}/food-entries`, data);
        return response.data;
    },

    updateFoodEntry: async (foodEntryId, data) => {
        const response = await api.put(`/food-entries/${foodEntryId}`, data);
        return response.data;
    },

    deleteFoodEntry: async (foodEntryId) => {
        const response = await api.delete(`/food-entries/${foodEntryId}`);
        return response.data;
    },

    getPatientAlerts: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/alerts`);
        return response.data;
    },

    addAlert: async (patientId, data) => {
        const response = await api.post(`/patients/${patientId}/alerts`, data);
        return response.data;
    },

    markAlertAsRead: async (alertId) => {
        const response = await api.put(`/alerts/${alertId}/read`);
        return response.data;
    },

    deleteAlert: async (alertId) => {
        const response = await api.delete(`/alerts/${alertId}`);
        return response.data;
    },

    getPatientRecommendations: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/recommendations`);
        return response.data;
    },

    addRecommendation: async (patientId, data) => {
        const response = await api.post(`/patients/${patientId}/recommendations`, data);
        return response.data;
    },

    updateRecommendation: async (recommendationId, data) => {
        const response = await api.put(`/recommendations/${recommendationId}`, data);
        return response.data;
    },

    deleteRecommendation: async (recommendationId) => {
        const response = await api.delete(`/recommendations/${recommendationId}`);
        return response.data;
    }
}; 