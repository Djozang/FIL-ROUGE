import api from '../config/axios';

export const chatService = {
    getAllChats: async () => {
        const response = await api.get('/chats');
        return response.data;
    },

    sendMessage: async (receiverId, message) => {
        const response = await api.post('/chats', {
            receiver_id: receiverId,
            message: message
        });
        return response.data;
    },

    markAsRead: async (chatId) => {
        const response = await api.put(`/chats/${chatId}/read`);
        return response.data;
    },

    getConversation: async (userId) => {
        const response = await api.get(`/chats/conversation/${userId}`);
        return response.data;
    }
}; 