import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';
export const useChatStore = create((set) => ({
    messages: [

    ],
    users: [

    ],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const response = await axiosInstance.get('/messages/users');
            set({ users: response.data });

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isUserLoading: false });
        }
    },
    getMessage: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    setSelectedUser: (selecetedUser) => set({ selecetedUser }),
}));